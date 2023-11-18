import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';


export default ({ mode }) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

    return defineConfig({
        plugins: [vue()],
    });
}