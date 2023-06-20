import {
  BoxGeometry,
  MeshBasicMaterial,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  TextureLoader,
} from 'three';
import { location as headerLoacation } from './header-object.js';
export const properties = {
  width: 1,
  height: 0.2,
  thick: 0.1,
};
export const location = {
  x: headerLoacation.x  + properties.thick
};
const LogoObject = () => {
  const geometry = new BoxGeometry(
    properties.width,
    properties.thick,
    properties.height
  );
  // const geometry = new BoxGeometry(x,y,z);
  const loader = new TextureLoader();
  const material = new MeshBasicMaterial({ transparent: true, });
  const materialImage = new MeshBasicMaterial({
    transparent: true,
    map: loader.load(
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXyipsfx8mQai4KSdP6jp3nH6FmJFraf2gIf5k8iM0&s'
    ),
  });
  const box = new Mesh(geometry, [
    material,
    material,
    materialImage,
    material,
    material,
    material,
  ]);
  const geo = new EdgesGeometry(box.geometry); // or WireframeGeometry
  const mat = new LineBasicMaterial({ color: 0x555555 });
  const wireframe = new LineSegments(geo, mat);
  box.add(wireframe);
  box.scale.set(1.0, 1.0, 1.0);
  box.position.set(
    -0.36 ,
    4.8,
    location.x
  );
  return box;
};
export default LogoObject;
