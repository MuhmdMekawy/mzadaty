<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page flex_tabs">
      <!-- القيم الاجمالي -->
      <div class="static_page finanicial_content">
        <div class="finanicial_tab">
          <h3>
            {{$t('due_finanicial.title')}}
          </h3>
          <hr>
          <div class="finanicial">
            <h3>
              {{$t('due_finanicial.total_auctions')}}
            </h3>
            <h6>
              <i class="pi pi-money-bill"></i>
              <span>
                {{getResult?.data?.totalPriceText}}
              </span>
            </h6>
          </div>
          <div class="finanicial">
            <h3>
              {{$t('due_finanicial.total_commission')}}
            </h3>
            <h6>
              <i class="pi pi-money-bill"></i>
              <span>
                {{getResult?.data?.totalAppCommissionText}}
              </span>
            </h6>
          </div>
          <div class="finanicial">
            <h3>
              {{$t('due_finanicial.total_tax')}}
            </h3>
            <h6>
              <i class="pi pi-money-bill"></i>
              <span>
                {{getResult?.data?.totalVatPriceText}}
              </span>
            </h6>
          </div>
          <div class="finanicial">
            <h3>
              {{$t('due_finanicial.total_due')}}
            </h3>
            <h6>
              <i class="pi pi-money-bill"></i>
              <span>
                {{getResult?.data?.totalPriceText}}
              </span>
            </h6>
          </div>
        </div>
      </div>
      <!-- حالة الطلب -->
      <div class="static_page finanicial_content">
        <div class="finanicial_tab">
          <div class="image">
            <img src="/assets/images/transaction_image.png" alt="image" loading="lazy">
          </div>
          <h3 style="text-align: center;">
            {{ getResult?.data?.statusHeadText}}
          </h3>
        </div>
      </div>
    </div>
    <!-- صورة الحوالة -->
    <div class="static_page transaction_image" v-if="getResult?.data?.image">
      <div class="finanicial_tab">
          <h3>
            صورة الحوالة
          </h3>
        <hr>
      </div>
      <div class="image fatoorah_image" @click="globalStore.handleShowImagePopup(getResult?.data?.image)">
        <img :src="getResult?.data?.image" alt="image" loading="lazy">
      </div>
    </div>
    <!-- تفاصيل الطلبات -->
    <div 
      class="order_item static_page" 
      v-for="item in getResult?.data?.financials" 
      :key="item?.id"
      v-if="!globalStore.loading && getResult?.data?.financials?.length > 0"
    >
      <h3>
        {{ $t('due_finanicial.order_num') }} {{ item?.id }}
      </h3>
      <ul>
        <li>
          <h4>
            {{ $t('due_finanicial.order_value') }}
          </h4>
          <h5>
            {{item?.price}}
          </h5>
        </li>
        <li>
          <h4>
            {{ $t('due_finanicial.order_tax') }}
          </h4>
          <h5>
            {{item?.vatPrice}}
          </h5>
        </li>
        <li>
          <h4>
            {{ $t('due_finanicial.order_commission') }}
          </h4>
          <h5>
            {{item?.commission}}
          </h5>
        </li>
      </ul>
      <h3>
        {{ $t('due_finanicial.order_total') }} : 
        {{item?.totalPrice}}
      </h3>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define route 
  const route = useRoute()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod(`settlement-details?id=${route.params.id}` , null , true , false)
  })
</script>

<style lang="scss" scoped>
  .static_page{
    box-shadow: none;
    padding: 0;
  }
  hr{
    margin-block:8px 4px !important; 
  }
  .finanicial_content{
    padding-block: 12px;

    .finanicial{
      @include displayFlex($justify : space-between);
      padding-block: 8px;
      h3{
        font-size: 14px;
        font-weight: 400;
      }
      h6{
        @include displayFlex($gap : 4px);
        span{
          font-size: 14px;
          font-weight: 400;
        }
      }
      &:last-of-type{
        h3,h6 span{
          font-weight: 900;
          filter: drop-shadow(0px 0px 0px black);
        }
      }
    }
    + .main-btn{
      max-width: 600px;
      margin-block: 0px;
    }
  }

  .flex_tabs{
    @include displayFlex($align : stretch);
    background: transparent !important;
    .static_page{
      flex-grow: 1;
      @include displayFlex($direction : column);
      padding: 8px;
      max-width: 800px;
      > .image{
        max-width: 170px;
        margin: 0 auto 20px;
        // + h3{
        //   width: 100%;
        // }
      }
      .finanicial_tab{
        width: 100% ;
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      .static_page{
        width: 100%;
        margin-bottom: 0 !important;
        &:last-of-type{
          padding-block: 20px;
        }
      }
    }
  }
  .transaction_image{
    align-items: flex-start;
    padding: 10px 8px;
    h3.title{
      text-align: start;
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
  .fatoorah_image{
    max-width: 100% !important;
    width: 100%;
    max-height: 200px;
    overflow: hidden;
    border-radius: 8px;
    margin: 15px 0 0 !important;

  }

  .order_item{
    font-size: 14px;
    padding: 10px 8px;
    ul{
      margin-block: 15px;
      @include displayFlex($justify : space-between);
    }
  }
</style>