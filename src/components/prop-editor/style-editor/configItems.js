import React from 'react';
import { FormColor, FormTransform, FormRadioGroup } from 'comps/form-item';
import { Icon } from 'antd';

const configItems = [
  { path: 'left', label: 'x坐标', className: 'quarter' },
  { path: 'top', label: 'y坐标', className: 'quarter' },
  { path: 'width', label: '宽度', className: 'quarter' },
  { path: 'height', label: '高度', className: 'quarter' },
  { path: 'color', label: '字体颜色', Comp: FormColor, className: 'half' },
  {
    path: 'backgroundColor',
    label: '背景颜色',
    Comp: FormColor,
    className: 'half',
  },
  { path: 'zIndex', label: '层级', className: 'half' },
  {
    path: 'textAlign',
    label: '对齐方式',
    Comp: FormRadioGroup,
    className: 'icon-center half',
    props: {
      options: [
        {
          value: 'left',
          text: <Icon type="align-left" />,
          toolTip: { title: '左对齐' },
        },
        {
          value: 'center',
          text: <Icon type="align-center" />,
          toolTip: { title: '居中对齐' },
        },
        {
          value: 'right',
          text: <Icon type="align-right" />,
          toolTip: { title: '右对齐' },
        },
      ],
    },
  },
  {
    path: 'transform',
    label: '旋转角度',
    Comp: FormTransform,
  },
];

export default configItems;
