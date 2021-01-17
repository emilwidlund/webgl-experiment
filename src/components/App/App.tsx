import * as React from 'react';
// @ts-ignore
import * as snowden from 'snowden';
// @ts-ignore
import * as normals from 'angle-normals';

import './App.css';
import { Mesh } from '../../core/Mesh';
import { Renderer } from '../../core/Renderer';
import { Scene } from '../../core/Scene';
import { PerspectiveCamera } from '../../core/Camera';
import { PhongMaterial } from '../../materials/PhongMaterial';
import { Color } from '../../core/Color';
import { PointLight } from '../../lights/PointLight';
import { Geometry } from '../../core/Geometry';

export const App = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const cameraRef = React.useRef<PerspectiveCamera>();

    const resize = React.useCallback(() => {
        if (canvasRef.current) {
            const gl = canvasRef.current.getContext('webgl2');
            const displayWidth = canvasRef.current.clientWidth;
            const displayHeight = canvasRef.current.clientHeight;

            if (!gl) {
                throw new Error('WebGL is not supported!');
            }

            if (canvasRef.current.width != displayWidth || canvasRef.current.height != displayHeight) {
                canvasRef.current.width = displayWidth;
                canvasRef.current.height = displayHeight;

                gl.viewport(0, 0, displayWidth, displayHeight);
                if (cameraRef.current) {
                    cameraRef.current.aspect = displayWidth / displayHeight;
                }
            }
        }
    }, [canvasRef.current, cameraRef.current]);

    React.useEffect(() => {
        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    React.useEffect(() => {
        if (canvasRef.current) {
            const width = canvasRef.current.width;
            const height = canvasRef.current.height;
            const gl = canvasRef.current.getContext('webgl2');

            if (!gl) {
                throw new Error('WebGL is not supported!');
            }

            const renderer = new Renderer(gl);
            renderer.backgroundColor = new Color(0, 0, 0);
            const scene = new Scene();
            const camera = new PerspectiveCamera(width / height);
            camera.position.set(0, 0, 20);

            cameraRef.current = camera;

            const mesh = new Mesh(
                new Geometry(
                    snowden.positions.flat(),
                    snowden.cells.flat(),
                    normals(snowden.cells, snowden.positions).flat(),
                    []
                ),
                new PhongMaterial(new Color(255, 40, 40))
            );
            scene.add(mesh);

            const pointLight = new PointLight();
            pointLight.position.set(0, 20, 10);
            scene.add(pointLight);

            let animationFrameId = 0;
            const loop = () => {
                mesh.rotateY(0.002);

                // camera.position.set(
                //     Math.cos(performance.now() * 0.001) * 10,
                //     0,
                //     Math.sin(performance.now() * 0.001) * 10
                // );
                // camera.lookAt(mesh.position);

                renderer.render(scene, camera);

                animationFrameId = requestAnimationFrame(loop);
            };

            animationFrameId = requestAnimationFrame(loop);

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, []);

    return <canvas ref={canvasRef} width="100%" height="100%" />;
};

// /** Sunflower Phyllotaxis */
// const geometry = new Geometry([], [], [], []);
// const count = 10000;

// for (let i = 0; i < count; i++) {
//     const size = 1;

//     const phi = Math.acos(-1 + (2 * i) / count);
//     const theta = Math.sqrt(count * Math.PI) * phi;

//     const vertex = Vector3.fromSphericalCoordinates(size, theta, phi);

//     geometry.vertices.push(...vertex.toArray());
// }
