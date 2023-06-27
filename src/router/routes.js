import layout from '@/views/layout'
import index from '@/views/index'

export default [
    {
        path: '/',
        component: layout,
        children: [
            {
                path: '/',
                component: index,
                meta: {
                    title: '项目配置',
                },
            },
        ],
    },
]
