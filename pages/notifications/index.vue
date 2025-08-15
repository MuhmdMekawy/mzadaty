<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <button 
        class="delete_all"  
        v-if="notifications?.length > 0"
        @click="handleDeleteAllNotifications"
        >
        {{
          globalStore?.lang == 'ar' ? 'حذف الكل' : 'Delete All'
        }}
      </button>
      <div class="notifications">
        <div 
          class="notification_tab"  
          v-for="i in 10" 
          :key="i"
          v-if="globalStore.loading"
        >
          <div class="image">
            <Skeleton width="50px" height="50px" />
          </div>
          <div class="text">
            <Skeleton width="500px" height="50px" v-if="globalStore.loading"/>          
          </div>
        </div>
        <div 
          class="notification_tab" 
          v-for="item in notifications" 
          :key="item?.id"
          v-else
        >
          <div class="image">
            <img src="/assets/images/mzadaty_logo.png" alt="image" loading="lazy">
          </div>
          <div class="text">
            <h3>{{item?.title}}</h3>
            <p>{{item?.message}}</p>
            <small>{{item?.timeAdd}}</small>
          </div>
          
          <button class="delete_notification" @click="handleDeleteNotification(item?.id)">
            <i class="pi pi-trash"></i>
          </button>
        </div>
        <Pagination 
          :data="notifications?.paginate"
          :end-point="'notifications'"
        />
      </div>
      <Empty  v-if="!globalStore.loading && notifications?.length == 0" />
    </div>  
  </div>
</template>

<script setup>
  import { Skeleton } from 'primevue'
  // define api methods 
  const {
    getMethod,
    getResult,
    submitMethod
  } = useApiMethods()

  // define global store
  const globalStore = useGlobalStore()


  // handle delete notification
  const handleDeleteNotification = (id) => {
    submitMethod(`delete-notification?id=${id}` , true , '' , 'DELETE' , '' , 'notifications' )
  }


  // handle delete all notifications
  const handleDeleteAllNotifications = () => {
    submitMethod('delete-all-notification' , true , '' , 'DELETE' , '' , 'notifications' )
  }

  const notifications = ref()

  watchEffect(()=>{
    if(getResult?.value){
      notifications.value = getResult?.value?.data
    }
    if(globalStore?.notifications){
      notifications.value = globalStore?.notifications
    }
  })

  onMounted(()=>{
    globalStore.handlePageName(globalStore.lang == 'ar' ? 'الاشعارات'  : 'Notifications')
    getMethod('notifications' , 1 , true , false)
  })
</script>

<style lang="scss" scoped>
  .static_page{
    background: transparent !important;
    box-shadow: none;
    .delete_all{
      color: $dangerColor;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      text-align: end;
      &:hover{
        text-decoration: underline;
      }
    }
    .notification_tab{
      padding: 12px;
      border-radius: 12px;
      background: #FFF;
      box-shadow: 0px 0px 8px 0px rgba(186, 186, 186, 0.18);
      @include displayFlex($justify : flex-start , $align : flex-start , $gap : 8px);
      position: relative ;
      .image{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0;
        overflow: hidden;
        flex-shrink: 0;
      }
      .text{
        h3{
          font-size: 14px;
          font-weight: 600;
          color: $mainColor;
          margin-bottom: 0;
        }
        p{
          font-size: 12px;
          font-weight: 400;
        }
        small{
          color: $secColor;
          font-size: 10px;
          font-weight: $secColor ;
        }
      }
      .delete_notification{
        position: absolute;
        inset-inline-end: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 25px;
        height: 25px;
        border-radius: 5px;
        @include displayFlex();
        transition: 0.3s;
        i.pi{
          font-size: 14px;
          font-weight: 800;
          color: $dangerColor;
        }
        &:hover{
          background: $dangerColor;
          i.pi{
            color: #fff;
          }
        }
      }
      &:not(:last-of-type){
        margin-bottom: 20px;
      }
    }
  }
</style>