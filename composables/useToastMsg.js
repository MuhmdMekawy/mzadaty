import { useToast } from 'primevue/usetoast';
import { useGlobalStore } from '@/stores/globalStore';

export function useToastMsg() {
  const toast = useToast();

  // define global store 
  const globalStore = useGlobalStore()

  const showToast = (severity, summary, detail, life = 1500) => {
    toast.add({ severity, summary, detail, life });
  };

  const showErrorToast = (message) => {
    const summary = globalStore?.lang == 'ar' ? 'خطأ' : 'Error';
    showToast('error', summary, message);
  };

  const showSuccessToast = (message) => {
    const summary = globalStore?.lang == 'ar' ? 'نجاح' : 'Success';
    showToast('success', summary, message);
  };

  const showInfoToast = (message) => {
    const summary = globalStore?.lang == 'ar' ? 'معلومة' : 'Info';
    showToast('info', summary, message);
  };

  const showWarnToast = (message) => {
    const summary = globalStore?.lang == 'ar' ? 'تحذير' : 'Warning';
    showToast('warn', summary, message);
  };

  return {
    toast,
    showErrorToast,
    showSuccessToast,
    showInfoToast,
    showWarnToast,
  };
}
