#version 300 es

precision mediump float;

in vec3 vertPosition;
in vec3 vertNormal;
in vec2 uv;

uniform mat4 u_Matrix;
uniform mat4 u_WorldMatrix;
uniform mat4 u_inversedWorldMatrix;
uniform float u_Time;

out vec3 fragNormal;
out vec2 fragUv;
out vec3 fragWorldPosition;

void main() {

    vec3 position = vertPosition;
    position.y += sin(u_Time * 0.01 + position.x) * 0.05;

    fragNormal = (u_inversedWorldMatrix * vec4(vertNormal, 0.0)).xyz;
    fragUv = uv;
    fragWorldPosition = (u_WorldMatrix * vec4(position, 1.0)).xyz;

    gl_Position = u_Matrix * vec4(position, 1.0);
}