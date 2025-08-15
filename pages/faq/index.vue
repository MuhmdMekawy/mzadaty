<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <div class="image">
        <img src="/assets/images/mzadaty_logo.png" alt="image" loading="lazy">
      </div>
      <div class="card">
          <Accordion value="1" v-if="getResult?.data">
              <AccordionPanel :value="item?.id" v-for="item in getResult?.data" :key="item?.id">
                  <AccordionHeader>{{item.question}}</AccordionHeader>
                  <AccordionContent>
                      <p class="m-0">
                          {{item.answer}}
                      </p>
                  </AccordionContent>
              </AccordionPanel>
          </Accordion>
          <Accordion v-else value="0">
              <AccordionPanel v-for="i in 8" :key="i">
                  <AccordionHeader>
                    <Skeleton  />
                  </AccordionHeader>
                  <AccordionContent>
                    <p class="m-0">
                        <Skeleton v-for="i in 4" :key="i" />
                      </p>
                  </AccordionContent>
              </AccordionPanel>
          </Accordion>
      </div>
    </div>  
  </div>
</template>

<script setup>
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';

  // define global Store 
  const globalStore = useGlobalStore()

  // define i18n
  const {t} = useI18n()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.faq'))
    getMethod('fqs' , null , false ,false)
  })
</script>

<style lang="scss" scoped>
  .p-accordionpanel{
    // border: 1px solid #e4e4e4;
    border-radius: 6px;
    box-shadow: 0px 0px 8px 0px #BABABA2E;
    background: #fff;
    border: none;
    &:not(:last-of-type){
      margin-bottom: 20px !important;  
    }
  }
</style>