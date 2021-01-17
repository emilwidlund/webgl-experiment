#version 300 es
#define MAX_LIGHTS 32

precision mediump float;

struct PhongMaterial {
    vec4 diffuse;
    vec4 specular;
    float shininess;
    vec4 emissive;
    float reflectivity;
};

struct AmbientLight {
    vec4 color;
    float intensity;
};

struct DirectionalLight {
    vec3 direction;
    vec4 color;
    float intensity;
};

struct PointLight {
    vec3 position;
    vec4 color;
    float intensity;
};

in vec3 fragNormal;
in vec2 fragUv;
in vec3 fragWorldPosition;

uniform mat4 u_WorldMatrix;
uniform float u_Time;
uniform PhongMaterial u_PhongMaterial;
uniform AmbientLight u_AmbientLights[MAX_LIGHTS];
uniform DirectionalLight u_DirectionalLights[MAX_LIGHTS];
uniform PointLight u_PointLights[MAX_LIGHTS];

out vec4 fragColor;

void main() {
    vec3 reflectedLightColor;
    vec3 ambientLightColor;
    vec3 normal = normalize(fragNormal);

    // Ambient Lights
     for (int i = 0; i < MAX_LIGHTS; i++) {
        float lightIntensity = u_AmbientLights[i].intensity;
        vec3 lightColor = u_AmbientLights[i].color.rgb;
        
        reflectedLightColor += lightColor * lightIntensity;
    }

    // Directional Lights
    for (int i = 0; i < MAX_LIGHTS; i++) {
        vec3 lightDirection = normalize(u_DirectionalLights[i].direction);
        vec3 inversedLightDirection = -lightDirection;

        float lightIntensity = u_DirectionalLights[i].intensity;
        vec3 lightColor = u_DirectionalLights[i].color.rgb;
        float reflectedIntensity = max(dot(normal, inversedLightDirection), 0.0) * lightIntensity;
        
        reflectedLightColor += reflectedIntensity * lightColor;
    }

    // Point Lights
    for (int i = 0; i < MAX_LIGHTS; i++) {
        vec3 lightPosition = u_PointLights[i].position;
        vec3 lightDirection = normalize(lightPosition - fragWorldPosition);

        float lightIntensity = u_PointLights[i].intensity;
        vec3 lightColor = u_PointLights[i].color.rgb;
        float reflectedIntensity = max(dot(normal, lightDirection), 0.0) * lightIntensity;

        reflectedLightColor += reflectedIntensity * lightColor;
    }

    // fragColor = u_PhongMaterial.diffuse;
    // fragColor.rgb *= reflectedLightColor;

    fragColor = vec4(0.5 * (1.0 + normal), 1.0);
    
}