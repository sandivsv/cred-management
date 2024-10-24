// import Modal from '../components/modal/Modal.vue'


import ArchieveIcon from '../components/icons/ArchieveIcon.vue'
import CardIcon from '../components/icons/CardIcon.vue'
import CrossIcon from '../components/icons/CrossIcon.vue'
import DashboardIcon from '../components/icons/DashboardIcon.vue'
import DownIcon from '../components/icons/DownIcon.vue'
import DownloadIcon from '../components/icons/DownloadIcon.vue'
import EyeIcon from '../components/icons/EyeIcon.vue'
import HomeIcon from '../components/icons/HomeIcon.vue'
import LockIcon from '../components/icons/LockIcon.vue'
import LogoutIcon from '../components/icons/LogoutIcon.vue'
import MenuIcon from '../components/icons/MenuIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
import RightArrowIcon from '@/components/icons/RightArrowIcon.vue'
import RightIcon from '@/components/icons/RightIcon.vue'
import SettingIcon from '@/components/icons/SettingIcon.vue'
import TransactionIcon from '@/components/icons/TransactionIcon.vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'


import Modal from '@/components/Modal.vue'

export default (app: any) => {
  // Icons here
  app.component('ArchieveIcon', ArchieveIcon)
  app.component('CardIcon', CardIcon)
  app.component('CrossIcon', CrossIcon)
  app.component('DashboardIcon', DashboardIcon)
  app.component('DownIcon', DownIcon)
  app.component('DownloadIcon', DownloadIcon)
  app.component('EyeIcon', EyeIcon)
  app.component('HomeIcon', HomeIcon)
  app.component('LockIcon', LockIcon)
  app.component('LogoutIcon', LogoutIcon)
  app.component('MenuIcon', MenuIcon)
  app.component('PlusIcon', PlusIcon)
  app.component('ProfileIcon', ProfileIcon)
  app.component('RightArrowIcon', RightArrowIcon)
  app.component('RightIcon', RightIcon)
  app.component('SettingIcon', SettingIcon)
  app.component('TransactionIcon', TransactionIcon)
  app.component('UploadIcon', UploadIcon)
  app.component('CloseIcon', CloseIcon)
  



  // Component
  app.component('Modal', Modal)

}
