import {
  Bars3Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  EyeIcon,
  FunnelIcon,
  LanguageIcon,
  LinkIcon,
  PaperClipIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import type { Component } from 'vue';


export enum IconEnum {
  Edit = 'Edit',
  Delete = 'Delete',
  BarsArrowDown = 'BarsArrowDown',
  BarsArrowUp = 'BarsArrowUp',
  Funnel = 'Funnel',
  Close = 'Close',
  Plus = 'Plus',
  PaperClip = 'PaperClip',
  Hamburger = 'Hamburger',
  ChevronRight = 'ChevronRight',
  ChevronLeft = 'ChevronLeft',
  ChevronDown = 'ChevronDown',
  ChevronUp = 'ChevronUp',
  DblChevronLeft = 'DblChevronLeft',
  DblChevronRight = 'DblChevronRight',
  Language = 'Language',
  Check = 'Check',
  View = 'View',
  Text = 'Text',
  Link = 'Link',
}

export const IconMap: Record<IconEnum, Component> = {
  Edit: PencilSquareIcon,
  Delete: TrashIcon,
  BarsArrowDown: BarsArrowDownIcon,
  BarsArrowUp: BarsArrowUpIcon,
  Funnel: FunnelIcon,
  Close: XMarkIcon,
  Plus: PlusCircleIcon,
  PaperClip: PaperClipIcon,
  Hamburger: Bars3Icon,
  ChevronRight: ChevronRightIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronDown: ChevronDownIcon,
  ChevronUp: ChevronUpIcon,
  DblChevronLeft: ChevronDoubleLeftIcon,
  DblChevronRight: ChevronDoubleRightIcon,
  Language: LanguageIcon,
  Check: CheckIcon,
  View: EyeIcon,
  Text: DocumentTextIcon,
  Link: LinkIcon,
};

export type IconDef = keyof typeof IconMap;

export type IconProp = IconDef | Component;