#version 450

in vec4 gl_FragCoord;

layout(location = 0) in vec2 v_Uv;
layout(location = 1) in float v_height;
layout(location = 2) in vec4 v_color;
layout(location = 3) in vec3 v_position;
layout(location = 4) in vec3 v_center;

layout(location = 0) out vec4 o_Target;

layout(set = 0, binding = 0) uniform Camera {
    mat4 ViewProj;
};
layout(set = 1, binding = 1) uniform StellarMaterial_basecolor {
    vec4 color;
};
layout(set = 1, binding = 4) uniform StellarMaterial_atmo_radius {
    float atmo_radius;
};
layout(set = 1, binding = 5) uniform StellarMaterial_camera_pos {
    mat4 camera_mat;
};
# ifdef STELLARMATERIAL_TEXTURE 
layout(set = 1, binding = 2) uniform texture2D StellarMaterial_texture;
layout(set = 1, binding = 3) uniform sampler StellarMaterial_texture_sampler;
# endif

void main() {
    vec4 acolor = color;
# ifdef STELLARMATERIAL_TEXTURE
    acolor *= texture(
        sampler2D(StellarMaterial_texture, StellarMaterial_texture_sampler),
        v_Uv);
# endif

    // vec3 cam_pos = vec3(camera_mat[3]);
    vec3 cam_pos = vec3(camera_mat[3][0], camera_mat[3][1], camera_mat[3][2]);
    float dist = distance(cam_pos, v_position);
    if (dist < 10000) {
        acolor = vec4(1.0, 0.0, 0.0, 1.0);
    } else if (dist < 20000) {
        acolor = vec4(1.0, 1.0, 0.0, 1.0);
    } else if (dist < 30000) {
        acolor = vec4(0.0, 1.0, 0.0, 1.0);
    } else if (dist < 40000) {
        acolor = vec4(0.0, 1.0, 1.0, 1.0);
    } else {
        acolor = vec4(0.0, 0.0, 1.0, 1.0);
    }

    o_Target = v_color * acolor;
    // o_Target = acolor;
}
