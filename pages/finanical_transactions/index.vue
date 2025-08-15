<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <TransactionStatuses 
      :finanicialStatus="finanicialStatus"
      @handleFinancialStatus="handleFinancialStatus"
    />
    <div v-if="finanicialStatus == 'due'">
      <div class="static_page finanicial_content" v-if="getResult?.data?.hasSettlementBtn">
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
                {{getResult?.data?.totalText}}
              </span>
            </h6>
          </div>
        </div>
      </div>
      <MainBtn 
        v-if="getResult?.data?.hasSettlementBtn"
        :buttonText="$t('due_finanicial.submit_btn')"
        @handleSubmit="handleRequestSettlement"
      />
      <div 
        class="order_item static_page" 
        v-for="item in getResult?.data?.financials" 
        :key="item?.id"
        v-if="!globalStore.loading && getResult?.data?.financials?.length > 0 && getResult?.data?.hasSettlementBtn"
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
    <div v-else class="static_page">
      <div
        v-for="item in getResult?.data"
        :key="item.id"
        class="settlement-item"
      >
        <div class="settlement-top-row">
          <span class="settlement-order">
            {{$t('settlement.settlement_order')}} {{ item.number }}
          </span>
          <span class="settlement-time">
            <i class="pi pi-clock" style="margin-inline-end: 4px;"></i>
            {{ item.fromTimeText }}
          </span>
        </div>
        <div class="settlement-mid-row">
          <span class="settlement-value">
            {{$t('settlement.settlement_value')}} {{ item.totalText }}
          </span>
          <span class="settlement-status">
            {{$t('settlement.settlement_status')}}
            <span :class="['status-label', item.status == 'pending' ? 'status-pending' : 'status-rejected']">
              {{ item?.statusHeadText }}
            </span>
          </span>
        </div>
        <hr class="settlement-hr" />
        <div class="settlement-bottom-row">
          <NuxtLink :to="localeRoute(`/finanical_transactions/${item.id}`)" class="view-more-btn">
            <i class="pi pi-eye"></i> {{$t('settlement.view_more')}}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="grid_content" v-if="globalStore.loading">
      <div class="auction" v-for="i in 18">
        <div class="control_btns">
          <button style="padding: 0;">
            <Skeleton width="24px" height="24px"/>
          </button>
          <button style="padding: 0;">
            <Skeleton width="24px" height="24px"/>
          </button>
        </div>
        <div class="info">
          <div class="image">
            <Skeleton width="100px" height="100px"/>
          </div>
          <h3>
            <Skeleton width="150px" height="20px"/>
          </h3>
        </div>
        <div class="details">
          <h6 style="flex-grow: 1;">
            <Skeleton width="100%" height="20px"/>
          </h6>
        </div>
      </div>
    </div>
    <Empty v-if="getResult?.data?.hasSettlementBtn == false ||  getResult?.data?.length == 0" />
  </div> 
</template>

<script setup>
  // define i18n
  const {t} = useI18n()


  // define global store 
  const globalStore = useGlobalStore()

  
  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
  } = useApiMethods()

  // define router
  const router = useRouter()

  // define locale route 
  const localeRoute = useLocaleRoute()



  // define financial status
  const finanicialStatus = ref('due')
  const handleFinancialStatus = (status) => {
    finanicialStatus.value = status
    if(status == 'due'){
      getMethod('due-financials' , null , true , false)
    }else{
      getMethod(`settlements?status=${status}` , null , true , false)
    }
  }


  // handle settlement request
  const handleRequestSettlement = () =>{
    submitMethod(`settlement-order` , true , {
      totalPrice:getResult?.value?.data?.totalPrice,
      totalVatPrice:getResult?.value?.data?.totalVatPrice,
      totalAppCommission:getResult?.value?.data?.totalAppCommission
    } , 'POST' ,'reload_page')
  }
  
  onMounted(()=>{
    globalStore.handlePageName(t('settlement.page_title'))
    getMethod('due-financials' , null , true , false)
  })
</script>

<style lang="scss" scoped>
  .static_page{
    background: transparent;
    box-shadow: none;
    margin: 0 auto;
    padding: 0;
  }
  .finanicial_content{
    padding-block: 12px;

    hr{
      margin-block: 4px 8px;
      width: 100%;
    }
    .finanicial{
      @include displayFlex($justify : space-between);
      padding-block: 8px;
      width: 100%;
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
  .filter_tabs {
    width : unset !important;
    li.status_tab{
      flex-grow: 1;
      text-align: center;
    }
  }
  .order_item{
    font-size: 14px;
    background: #fff;
    margin-top: 10px;
    padding: 10px 8px;
    ul{
      margin-block: 15px;
      @include displayFlex($justify : space-between);
    }
  }
  .static_page{
    > div{
      @extend .settlement-item;
      + div{
        margin-top: 18px;
      }
    }
  }
  .settlement-item{
    @include displayFlex($direction: column, $align: flex-start, $gap : 0);
    width: 100%;
    padding: 20px 24px;
    box-shadow: 0 2px 8px #0001;
    border-radius: 12px;
    background: #fff;
  }
  .settlement-top-row,
  .settlement-mid-row{
    @include displayFlex($justify: space-between);
    width: 100%;
    font-size: 14px;
    font-weight: 300 ;
  }
  .settlement-mid-row{
    margin-top: 4px;
    margin-bottom: 0;
  }
  .settlement-hr {
    margin: 12px 0 10px 0;
    border: none;
    border-top: 1px solid #eee;
    width: 100%;
  }
  .settlement-bottom-row {
    @include displayFlex($justify: center);
    margin-top: 0;
    width: 100%;
  }
  .view-more-btn {
    @include displayFlex($gap: 4px);
    background: none;
    border: none;
    color: #222;
    font-weight: 300;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
    padding: 0;
  }
  .status-label {
    font-weight: 400;
    font-size: 14px;
    &.status-pending {
      color: #f7b500;
    }
    &.status-rejected {
      color: #e74c3c;
    }
  }
</style>