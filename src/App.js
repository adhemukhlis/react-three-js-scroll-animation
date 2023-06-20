import React, { useEffect } from 'react';
import './style.scss';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import ContainerObject, {
  properties as containerProperties,
} from './3dcomponents/container-object.js';
import HeaderObject, {
  properties as headerProperties,
  location as headerLocation,
} from './3dcomponents/header-object.js';
import BottomNavObject, {
  properties as bottomNavProperties,
  location as bottomNavLocation,
} from './3dcomponents/bottom-nav-object.js';
import LogoObject, {
  properties as logoProperties,
  location as logoLocation,
} from './3dcomponents/logo-object.js';

export default function App() {
  const sections = [...Array(10).keys()];
  let container;
  let camera;
  let renderer;
  let scene;
  const container_object = ContainerObject();
  const header_object = HeaderObject();
  const bottom_nav_object = BottomNavObject();
  const logo_object = LogoObject();
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  const init = () => {
    container = document.querySelector('.scene.one');
    scene = new Scene();
    const fov = 45;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 1;
    const far = 1000;
    camera = new PerspectiveCamera(fov, aspect, near, far);
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    scene.add(container_object);
    scene.add(header_object);
    scene.add(bottom_nav_object);
    scene.add(logo_object);

    animate();
  };
  useEffect(() => {
    init();
    window.addEventListener('resize', onWindowResize);
    gsap.registerPlugin(ScrollTrigger);
    scene.rotation.set(0, 0, 0);
    scene.position.set(0, 0, 0);
    // scene.position.set(x,y,z);
    camera.position.set(0, 0, 10);
    ScrollTrigger.defaults({
      immediateRender: false,
      ease: 'expo.inOut',
    });
    let gsap_anim_tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-0',
        start: 'top top',
        endTrigger: `.section-${sections.length - 1}`,
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    gsap_anim_tl
      .to(container_object.position, { y: 0 })
      .to(container_object.rotation, { y: Math.PI / 2, x: Math.PI / 2 })
      .to(
        bottom_nav_object.position,
        { y: 0 - containerProperties.height / 2 + headerProperties.height / 2 },
        'nav-reveal'
      )
      .to(bottom_nav_object.rotation, { x: Math.PI / 2 }, 'nav-reveal')
      .to(
        header_object.position,
        { y: containerProperties.height / 2 - headerProperties.height / 2 },
        'header-reveal'
      )
      .to(
        header_object.rotation,
        { y: Math.PI / 2, x: Math.PI / 2 },
        'header-reveal'
      )
      .to(
        logo_object.position,
        { y: containerProperties.height / 2 - headerProperties.height / 2 },
        'logo-reveal'
      )
      .to(logo_object.rotation, { x: Math.PI / 2 }, 'logo-reveal')
      .to(scene.rotation, { y: Math.PI / 4 }, 'scene-1')
      .to(camera.position, { z: 6 }, 'scene-1')
      .to(
        bottom_nav_object.position,
        { z: bottomNavLocation.x + 0.2 },
        'floating-1'
      )
      .to(header_object.position, { z: headerLocation.x + 0.2 }, 'floating-1')
      .to(
        logo_object.position,
        { z: headerLocation.x + logoLocation.x + 0.2 },
        'floating-1'
      );

    // .to(box.rotation, { x: Math.PI / 2 })
    // .to(scene.rotation, { z: 1.6 })
    // .to(scene.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
    // .to(camera.position, { x: 0.16 }, 'simultaneously')
    // .to('.scene.one', { opacity: 0, scale: 0 }, 'simultaneously');
  }, []);
  const GenerateSections = () =>
    sections.map((value, index) => (
      <section key={value} className={`section-${value}`}>
        {index === 0 && <div class="mouse"></div>}
      </section>
    ));
  return (
    <div>
      <div className="scene one"></div>
      <GenerateSections />
    </div>
  );
}
