import {
  BoxGeometry,
  MeshBasicMaterial,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
} from 'three';
export const properties = {
  width: 2,
  height: 3.6,
  thick: 0.1,
};
const ContainerObject = () => {
  const geometry = new BoxGeometry(
    properties.height,
    properties.thick,
    properties.width
  );
  const material = new MeshBasicMaterial({ color: 0xf0f0f0 });
  const box = new Mesh(geometry, material);
  const geo = new EdgesGeometry(box.geometry); // or WireframeGeometry
  const mat = new LineBasicMaterial({ color: 0x555555 });
  const wireframe = new LineSegments(geo, mat);
  box.add(wireframe);
  box.scale.set(1.0, 1.0, 1.0);
  box.position.set(0, 4.8, 0);
  return box;
};
export default ContainerObject;
