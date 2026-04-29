import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ─── helpers ─── */
function latLngToVec3(lat, lng, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* Approximate continent points (lat, lng) for the dot grid */
const LAND_POINTS = (() => {
  const pts = [];

  // Helper to add a rectangular region of points
  const addRegion = (latMin, latMax, lngMin, lngMax, step = 5) => {
    for (let lat = latMin; lat <= latMax; lat += step) {
      for (let lng = lngMin; lng <= lngMax; lng += step) {
        pts.push([lat, lng]);
      }
    }
  };

  // North America
  addRegion(25, 70, -130, -60, 5);
  // South America
  addRegion(-55, 10, -80, -35, 5);
  // Europe
  addRegion(35, 70, -10, 40, 5);
  // Africa
  addRegion(-35, 35, -17, 50, 5);
  // Asia
  addRegion(10, 70, 40, 145, 5);
  // Australia
  addRegion(-40, -12, 113, 153, 5);

  return pts;
})();

/* ─── Connection arcs between cities ─── */
const CONNECTIONS = [
  { from: [40.7, -74], to: [51.5, -0.1] },       // NYC → London
  { from: [51.5, -0.1], to: [28.6, 77.2] },       // London → Delhi
  { from: [28.6, 77.2], to: [35.7, 139.7] },      // Delhi → Tokyo
  { from: [35.7, 139.7], to: [-33.9, 151.2] },    // Tokyo → Sydney
  { from: [40.7, -74], to: [-23.5, -46.6] },      // NYC → São Paulo
  { from: [51.5, -0.1], to: [-1.3, 36.8] },       // London → Nairobi
  { from: [28.6, 77.2], to: [1.3, 103.8] },       // Delhi → Singapore
  { from: [35.7, 139.7], to: [37.6, 127] },       // Tokyo → Seoul
];

function createArcCurve(from, to, radius) {
  const vFrom = latLngToVec3(from[0], from[1], radius);
  const vTo = latLngToVec3(to[0], to[1], radius);
  const mid = new THREE.Vector3().addVectors(vFrom, vTo).multiplyScalar(0.5);
  const dist = vFrom.distanceTo(vTo);
  mid.normalize().multiplyScalar(radius + dist * 0.35);
  const curve = new THREE.QuadraticBezierCurve3(vFrom, mid, vTo);
  return curve;
}

/* ─── Globe wireframe sphere ─── */
function GlobeWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[2, 48, 48]} />
      <meshBasicMaterial
        color="#0f3d1f"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

/* ─── Land dots ─── */
function LandDots() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    return LAND_POINTS.map(([lat, lng]) => latLngToVec3(lat, lng, 2.01));
  }, []);

  useMemo(() => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
      <circleGeometry args={[0.025, 8]} />
      <meshBasicMaterial color="#22c55e" transparent opacity={0.6} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

/* ─── Animated arcs ─── */
function ConnectionArcs() {
  const groupRef = useRef();

  const arcs = useMemo(() => {
    return CONNECTIONS.map((conn) => {
      const curve = createArcCurve(conn.from, conn.to, 2);
      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((line, i) => {
      const mat = line.material;
      mat.dashOffset = -clock.elapsedTime * 0.5 + i * 2;
    });
  });

  return (
    <group ref={groupRef}>
      {arcs.map((geom, i) => (
        <line key={i} geometry={geom}>
          <lineDashedMaterial
            color="#4ade80"
            transparent
            opacity={0.5}
            dashSize={0.15}
            gapSize={0.1}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
}

/* ─── City nodes (glowing dots at arc endpoints) ─── */
function CityNodes() {
  const cities = useMemo(() => {
    const set = new Set();
    const result = [];
    CONNECTIONS.forEach(({ from, to }) => {
      [from, to].forEach((c) => {
        const key = `${c[0]},${c[1]}`;
        if (!set.has(key)) {
          set.add(key);
          result.push(latLngToVec3(c[0], c[1], 2.02));
        }
      });
    });
    return result;
  }, []);

  return (
    <group>
      {cities.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#4ade80" />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Atmosphere glow ─── */
function Atmosphere() {
  const materialRef = useRef();

  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.133, 0.773, 0.369, 1.0) * intensity * 0.6;
    }
  `;

  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[2, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
      />
    </mesh>
  );
}

/* ─── Rotating group ─── */
function GlobeGroup() {
  const groupRef = useRef();

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, -0.3, 0.1]}>
      <GlobeWireframe />
      <LandDots />
      <ConnectionArcs />
      <CityNodes />
      <Atmosphere />
    </group>
  );
}

/* ─── Exported component ─── */
export default function Globe() {
  return (
    <div className="globe-container" id="globe-3d">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.6} />
        <GlobeGroup />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
