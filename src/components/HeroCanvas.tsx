import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b111e, 12, 45);
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 4, 14);

    const grid = new THREE.GridHelper(80, 60, 0x1e3a5f, 0x15233a);
    grid.position.y = -2;
    scene.add(grid);

    // growth line
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = -14 + t * 28;
      const y = -2 + Math.pow(t, 1.8) * 7 + Math.sin(t * 18) * 0.35 * (1 - t * 0.5);
      pts.push(new THREE.Vector3(x, y, -2 - t * 4));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 300, 0.05, 8), tubeMat);
    scene.add(tube);
    const glow = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 300, 0.22, 8),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.12 }),
    );
    scene.add(glow);
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7 }),
    );
    scene.add(tip);

    // particles
    const count = mobile ? 250 : 700;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 14 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x8fb3d9, size: 0.05, transparent: true, opacity: 0.6 }),
    );
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const k = 1 - Math.exp(-2 * dt);
      camera.position.x += (mouse.x * 3 - camera.position.x) * k;
      camera.position.y += (4 - mouse.y * 2 - camera.position.y) * k;
      camera.lookAt(0, 1.5, -3);
      particles.rotation.y = t * 0.02;
      particles.position.y = Math.sin(t * 0.3) * 0.3;
      tip.position.copy(curve.getPoint((t * 0.08) % 1));
      raf = requestAnimationFrame(loop);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}
