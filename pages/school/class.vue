<template>
	<view class="class">
		<timetable :timetables="timetables"></timetable>
	</view>
</template>

<script>
    import Timetable from '@/components/lpx-timetable/lpx-timetable'
    export default {
        data() {
            return {
                timetables: [
                  ['信号与系统', '信号与系统', '模拟电子技术基础', '模拟电子技术基础', '', '', 'JavaScript编程艺术', 'JavaScript编程艺术', '', '', '生活中的经济学', '生活中的经济学'],
                  ['', '', '信号与系统', '信号与系统', '模拟电子技术基础', '模拟电子技术基础', '', '', '', '', '', ''],
                  ['世界三大文明', '世界三大文明', '', '', '', '', '形势与政策', '形势与政策', '', '', '', ''],
                  ['', '', 'JavaScript编程艺术', 'JavaScript编程艺术', '', '', '', '', '电装实习', '电装实习', '电装实习', '电装实习'],
                  ['', '', '现代通信网络', '现代通信网络', '', '', '', '', '电磁场与电磁波', '电磁场与电磁波', '', '']
                ]
            }
        },
		components:{
			Timetable
		}
    }
</script>