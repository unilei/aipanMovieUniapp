<template>
    <view class="scroll-wrap" :style="{zIndex: zIndex}">
        <scroll-view
            v-if="!isShowList"
            class="scroll-view_hold"
            scroll-x="true"
            scroll-with-animation="true"
            :scroll-left="position"
        >
            <view
                v-for="(item, index) in list"
                :key="index"
                :style="choseInd === index ? getActiveStyle : getDefaultStyle"
                class="scroll-view-item"
                :data-item="item"
                @click="onClickScrollItem(index, $event)"
            >{{item.type_name}}</view>
            <view v-if="isUseOpenList" style="width:62rpx;display: inline-block;"></view>
        </scroll-view>
        <view v-if="isUseOpenList" v-show="!isShowList" class="open-list" @click="handleShowList">
            <slot name="icon-unfold">
                <svg t="1606641905404" class="icon-unfold" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2927" width="200" height="200"><path d="M231.424 346.208a32 32 0 0 0-46.848 43.584l297.696 320a32 32 0 0 0 46.4 0.48l310.304-320a32 32 0 1 0-45.952-44.544l-286.848 295.808-274.752-295.36z" p-id="2928" fill="#bfbfbf"></path></svg>
            </slot>
        </view>
        <view v-show="isShowList" class="list-wrap bg-fff">
            <slot name="open-list-tit">
                <view class="flex justify-between border-bottom-solid-ccc">
                    <view class="text-lineheight-lg padding-lr size-28">{{ openListTit }}</view>
                    <view
                        class="flex align-center text-lineheight-lg padding-lr"
                        @click="handleShowList"
                    >
                        <slot name="icon-fold">
                            <svg t="1606641830061" class="icon-fold" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2132" width="200" height="200"><path d="M887.328 617.152L533.952 267.008c-0.512-0.512-1.216-0.672-1.76-1.152-0.128-0.128-0.16-0.32-0.288-0.448-12.576-12.416-32.832-12.352-45.28 0.192L136.512 618.944c-12.448 12.576-12.352 32.8 0.192 45.248a31.972 31.972 0 0 0 22.528 9.28c8.224 0 16.48-3.168 22.72-9.472l327.84-330.816 332.48 329.408a31.917 31.917 0 0 0 22.528 9.28c8.256 0 16.48-3.168 22.72-9.472 12.448-12.544 12.352-32.8-0.192-45.248z" p-id="2133" fill="#bfbfbf"></path></svg>
                        </slot>
                    </view>
                </view>
            </slot>
            
            <view class="flex flex-wrap padding-lr padding-bottom-sm">
                <view
                    v-for="(item, index) in list"
                    :key="index"
                    :style="choseInd === index ? getActiveStyle : getDefaultStyle"
                    class="scroll-view-item_wrap"
                    :data-item="item"
                    @click="onClickListItem(index, $event)"
                >{{item.type_name}}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
        isUseOpenList: {
            type: Boolean,
            default: true
        },
        openListTit: {
            type: String,
            default: '切换'
        },
        itemStyleDefault: {
            type: Object,
            default: ()=>({}),
        },
        itemStyleActive: {
            type: Object,
            default: ()=>({})
        },
        zIndex: {
            type:  [String, Number], 
            default: 1000
        },
        defaultChoseInd: {
            type: Number,
            default: 0
        },
        defaultChoseItem: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            scrollViewLeftArr: new Map(), // 存储scroll信息
            choseInd: 0, // 当前选中
            position: 0, // 滑动位置
            windowWidth: 0, // 页面高度
            isShowList: false, // 是否展示为列表形式
        }
    },
    computed: {
        getDefaultStyle() {
           const { itemStyleDefault } = this
            let defaultStyleObj = {
                color: '#393939',
                background: '#f4f4f4'
            }
            return this.setStyle(defaultStyleObj, itemStyleDefault)
        },
        getActiveStyle() {
            const { itemStyleActive } = this
            let activeStyleObj = {
                color: '#3555fc',
                'border': '1rpx solid #3555fc;'
            }
            return this.setStyle(activeStyleObj, itemStyleActive)
        }
    },
    async mounted() {
        const { defaultChoseInd, defaultChoseItem }  = this || {}
        this.choseInd = defaultChoseInd

        let defaultItemInd = -1
        if (defaultChoseItem) {
           defaultItemInd =  this.list.findIndex((item) => item === defaultChoseItem)
           this.choseInd = defaultItemInd !== -1 ? defaultItemInd : 0
        }

        const [_, { windowWidth }] = await uni.getSystemInfo() || {}
        this.windowWidth = windowWidth
        // 获取列表每个dom的偏移量
        const query = uni.createSelectorQuery().in(this)
        query.selectAll('.scroll-view-item').boundingClientRect()
        query.exec((res) => {
            res[0].forEach((element, i)=> {
                const item = element.dataset.item
                const { left } = element || {}
                const obj = {
                    name: item,
                    left: left,
                }
                this.scrollViewLeftArr.set(item, obj)
                if (i === defaultChoseInd && !defaultChoseItem) {
                    this.position = left - (windowWidth / 2 - 30)
                }
                if (i === defaultItemInd && defaultChoseItem) {
                    this.position = left - (windowWidth / 2 - 30)
                }
            })
        })
        
    },
    methods: {
        onClickListItem(index, event) {
            this.isShowList = false
            const { item } = event.currentTarget.dataset
            const val = this.scrollViewLeftArr.get(item)
            this.position = val.left - (this.windowWidth / 2 - 30)
            this.choseInd = index
            this.$emit('onValueChange', {currentInd: index, currentItem: item})
            this.$emit('onListShow', true)
        },
        onClickScrollItem(index, event) {
            this.choseInd = index
            const { item } = event.currentTarget.dataset
            const { offsetLeft } = event.target
            console.log(this.windowWidth, 'this.windowWidth')
            this.position = offsetLeft - (this.windowWidth / 2 - 30)
            this.$emit('onValueChange', {currentInd: index, currentItem: item})
        },
        handleShowList() {
            this.isShowList = !this.isShowList
            this.$emit('onListShow', !this.isShowList)
        },
        setStyle(DefaultStyleObj, CurrentStyleObj) {
            Object.assign(DefaultStyleObj, CurrentStyleObj)
            let style = ''
            Object.keys(DefaultStyleObj).forEach(e=> {
                style += `${e}: ${DefaultStyleObj[e]};`
            })
            return style
        }
    },
}
</script>

<style scoped>
.flex {
    display: flex;
}

.flex-wrap {
    flex-wrap: wrap;
}


.padding-lr {
    padding: 0 30rpx;
}

.padding-bottom-sm {
    padding-bottom: 20rpx;
}

.justify-between {
    justify-content: space-between;
}

.align-center {
    align-items: center;
}

.text-lineheight-lg {
    line-height: 80rpx;
}

.border-bottom-solid-ccc {
    border-bottom: 1rpx solid #ccc;
}

.size-28 {
    font-size: 28rpx;
}

.scroll-view_hold {
    position: relative;
    padding: 30rpx 0 30rpx 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    background: #fff;
}

.scroll-view_hold  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.scroll-view-item {
    min-width: 120rpx;
    padding: 0 20rpx;
    display: inline-block;
    text-align: center;
    line-height: 60rpx;
    font-size: 25rpx;
    border-radius: 32rpx;
    margin: 0 0 0 20rpx;
}

.scroll-wrap {
    position: relative;
    width: 100%;
}

.open-list {
    position: absolute;
    right: 0;
    top: 0;
    width: 60rpx;
    line-height: 119rpx;
    text-align: center;
    font-weight: 600;
    color: #585858;
    background: rgba(255, 255, 255, 0.7);
}

.scroll-view-item_wrap {
    min-width: 140rpx;
    text-align: center;
    line-height: 60rpx;
    font-size: 25rpx;
    border-radius: 32rpx;
    margin: 20rpx 0 0 30rpx;
}

.icon-unfold {
    width: 30rpx;
    height: 60rpx;
    padding: 30rpx 0 30rpx 0;
}

.icon-fold {
    width: 30rpx;
    height: 60rpx;
}


</style>