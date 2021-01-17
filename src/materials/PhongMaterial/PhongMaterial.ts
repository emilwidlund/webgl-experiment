import { PerspectiveCamera } from '../../core/Camera';
import { Color } from '../../core/Color';
import { Geometry } from '../../core/Geometry';
import { Material } from '../../core/Material';
import { Mesh } from '../../core/Mesh';
import { Scene } from '../../core/Scene';
import { Uniform, UniformValueType } from '../../core/Uniform';
import { AmbientLight } from '../../lights/AmbientLight';
import { DirectionalLight } from '../../lights/DirectionalLight';
import { PointLight } from '../../lights/PointLight';
import { Matrix4 } from '../../math/Matrix4';
import { Vector3 } from '../../math/Vector3';
import { Vector4 } from '../../math/Vector4';

export class PhongMaterial extends Material {
    /** Specular Color */
    specular: Color = new Color(20, 20, 20);

    /** Shininess */
    shininess: number = 30;

    /** Emissive Color */
    emissive: Color = new Color(0, 0, 0);

    /** Emissive Intensity */
    emissiveIntensity: number = 1.0;

    /** Reflectivity */
    reflectivity: number = 1;

    /** Refraction Ratio */
    refractionRatio: number = 0.98;

    /** Wireframe */
    wireframe: boolean = false;

    /** Wireframe Width */
    wireframeWidth: number = 1;

    /** Diffuse Color */
    get diffuse(): Color {
        return this.color;
    }
}

export const phongUniforms = (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    scene: Scene,
    camera: PerspectiveCamera,
    mesh: Mesh<Geometry, PhongMaterial>
): Map<string, Uniform> => {
    const uniforms = new Map<string, Uniform>();

    /** Compute Model Matrix */
    const modelWorldMatrixUniform = new Uniform(
        'u_WorldMatrix',
        mesh.worldMatrix,
        UniformValueType.MATRIX_4,
        program,
        gl
    );

    const modelMatrix = Matrix4.multiply(camera.projectionViewMatrix, mesh.worldMatrix);
    const modelMatrixUniform = new Uniform('u_Matrix', modelMatrix, UniformValueType.MATRIX_4, program, gl);

    /** Compute Inversed View Matrix */
    const inversedWorldMatrix = new Matrix4().copy(mesh.worldMatrix).invert().transpose();
    const inversedWorldMatrixUniform = new Uniform(
        'u_inversedWorldMatrix',
        inversedWorldMatrix,
        UniformValueType.MATRIX_4,
        program,
        gl
    );

    /** Time Uniform */
    const timeUniform = new Uniform('u_Time', performance.now(), UniformValueType.FLOAT, program, gl);

    /** Directional Lights */

    const directionalLights = scene.lights.filter(light => light instanceof DirectionalLight) as DirectionalLight[];

    for (let i = 0; i < directionalLights.length; i++) {
        const directionalLightDirection = new Uniform(
            `u_DirectionalLights[${i}].direction`,
            directionalLights[i].direction,
            UniformValueType.VECTOR_3_FLOAT,
            program,
            gl
        );

        uniforms.set(directionalLightDirection.name, directionalLightDirection);

        const directionalLightColor = new Uniform(
            `u_DirectionalLights[${i}].color`,
            new Vector4(...directionalLights[i].color.toArray(true)),
            UniformValueType.VECTOR_4_FLOAT,
            program,
            gl
        );

        uniforms.set(directionalLightColor.name, directionalLightColor);

        const directionalLightIntensity = new Uniform(
            `u_DirectionalLights[${i}].intensity`,
            directionalLights[i].intensity,
            UniformValueType.FLOAT,
            program,
            gl
        );

        uniforms.set(directionalLightIntensity.name, directionalLightIntensity);
    }

    /** Ambient Lights */

    const ambientLights = scene.lights.filter(light => light instanceof AmbientLight) as AmbientLight[];

    for (let i = 0; i < ambientLights.length; i++) {
        const ambientLightColor = new Uniform(
            `u_AmbientLights[${i}].color`,
            new Vector4(...ambientLights[i].color.toArray(true)),
            UniformValueType.VECTOR_4_FLOAT,
            program,
            gl
        );

        uniforms.set(ambientLightColor.name, ambientLightColor);

        const ambientLightIntensity = new Uniform(
            `u_AmbientLights[${i}].intensity`,
            ambientLights[i].intensity,
            UniformValueType.FLOAT,
            program,
            gl
        );

        uniforms.set(ambientLightIntensity.name, ambientLightIntensity);
    }

    /** Point Lights */

    const pointLights = scene.lights.filter(light => light instanceof PointLight) as PointLight[];

    for (let i = 0; i < pointLights.length; i++) {
        const pointLightPosition = new Uniform(
            `u_PointLights[${i}].position`,
            pointLights[i].worldMatrix.translation,
            UniformValueType.VECTOR_3_FLOAT,
            program,
            gl
        );

        uniforms.set(pointLightPosition.name, pointLightPosition);

        const pointLightColor = new Uniform(
            `u_PointLights[${i}].color`,
            new Vector4(...pointLights[i].color.toArray(true)),
            UniformValueType.VECTOR_4_FLOAT,
            program,
            gl
        );

        uniforms.set(pointLightColor.name, pointLightColor);

        const pointLightIntensity = new Uniform(
            `u_PointLights[${i}].intensity`,
            pointLights[i].intensity,
            UniformValueType.FLOAT,
            program,
            gl
        );

        uniforms.set(pointLightIntensity.name, pointLightIntensity);
    }

    /** Phong Properties */

    const diffuseUniform = new Uniform(
        'u_PhongMaterial.diffuse',
        new Vector4(...mesh.material.diffuse.toArray(true)),
        UniformValueType.VECTOR_4_FLOAT,
        program,
        gl
    );

    const specularUniform = new Uniform(
        'u_PhongMaterial.specular',
        new Vector4(...mesh.material.specular.toArray(true)),
        UniformValueType.VECTOR_4_FLOAT,
        program,
        gl
    );

    const emissiveUniform = new Uniform(
        'u_PhongMaterial.emissive',
        new Vector4(...mesh.material.emissive.toArray(true)),
        UniformValueType.VECTOR_4_FLOAT,
        program,
        gl
    );

    const shininessUniform = new Uniform(
        'u_PhongMaterial.shininess',
        mesh.material.shininess,
        UniformValueType.FLOAT,
        program,
        gl
    );

    const reflecitvityUniform = new Uniform(
        'u_PhongMaterial.reflectivity',
        mesh.material.reflectivity,
        UniformValueType.FLOAT,
        program,
        gl
    );

    uniforms.set(modelWorldMatrixUniform.name, modelWorldMatrixUniform);
    uniforms.set(modelMatrixUniform.name, modelMatrixUniform);
    uniforms.set(inversedWorldMatrixUniform.name, inversedWorldMatrixUniform);
    uniforms.set(timeUniform.name, timeUniform);

    uniforms.set(diffuseUniform.name, diffuseUniform);
    uniforms.set(specularUniform.name, specularUniform);
    uniforms.set(emissiveUniform.name, emissiveUniform);
    uniforms.set(shininessUniform.name, shininessUniform);
    uniforms.set(reflecitvityUniform.name, reflecitvityUniform);

    return uniforms;
};
