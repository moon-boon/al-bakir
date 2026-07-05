import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACCENTS = [0x0a84ff, 0xff9f0a, 0x30d158];
const BUILDING_COUNT = 11;

export default function Building3DScene({ reduced }: { reduced: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.4, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    for (let i = 0; i < BUILDING_COUNT; i++) {
      const w = 0.7 + Math.random() * 0.7;
      const d = 0.7 + Math.random() * 0.7;
      const h = 1.4 + Math.random() * 5.2;
      const color = ACCENTS[i % ACCENTS.length];

      const geo = new THREE.BoxGeometry(w, h, d);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08 });
      const mesh = new THREE.Mesh(geo, mat);

      const edgesGeo = new THREE.EdgesGeometry(geo);
      const edgesMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);

      const x = (i - (BUILDING_COUNT - 1) / 2) * 1.55 + (Math.random() - 0.5) * 0.3;
      const z = (Math.random() - 0.5) * 4;
      mesh.position.set(x, h / 2, z);
      edges.position.copy(mesh.position);

      group.add(mesh, edges);
      geometries.push(geo, edgesGeo);
      materials.push(mat, edgesMat);
    }

    // Cursor-follow targets (normalized -1..1), smoothed each frame toward the pointer.
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let t = 0;
    // Low lerp factor keeps the follow slow and buttery-smooth (heavy easing toward the cursor).
    const EASE = 0.028;
    const animate = () => {
      if (!reduced) {
        t += 0.0015;
        current.x += (target.x - current.x) * EASE;
        current.y += (target.y - current.y) * EASE;
        // Cursor drives the sway; a faint idle sine keeps the skyline alive when the pointer is still.
        group.rotation.y = current.x * 0.5 + Math.sin(t) * 0.05;
        group.rotation.x = current.y * 0.16;
        camera.position.x = current.x * 2.2;
        camera.position.y = 3.4 - current.y * 1.1;
      }
      camera.lookAt(0, 2, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
