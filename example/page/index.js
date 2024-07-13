import { getText } from '@zos/i18n'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
Page({
  build() {
    console.log(getText('example'))
  }
})
