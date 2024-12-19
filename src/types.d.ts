import type icons from 'bootstrap-icons/font/bootstrap-icons.json'

type IconName = keyof typeof icons

export interface ComponentWithIcon {
  iconName: IconName
}
