import {
  BoxGeometry,
  MeshBasicMaterial,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
} from 'three';
import { properties as containerProperties } from './container-object.js';
export const properties = {
  width: 2,
  height: 0.5,
  thick: 0.1,
};
export const location = {
  x: containerProperties.thick / 2 + properties.thick / 2,
};
const HeaderObject = () => {
  const geometry = new BoxGeometry(
    properties.height,
    properties.thick,
    properties.width
  );
  // const geometry = new BoxGeometry(x,y,z);
  const material = new MeshBasicMaterial({ color: 0xfafafa });
  const box = new Mesh(geometry, material);
  const geo = new EdgesGeometry(box.geometry); // or WireframeGeometry
  const mat = new LineBasicMaterial({ color: 0x555555 });
  const wireframe = new LineSegments(geo, mat);
  box.add(wireframe);
  box.scale.set(1.0, 1.0, 1.0);
  box.position.set(0, 4.8, location.x);
  return box;
};
export default HeaderObject;
