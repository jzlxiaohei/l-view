import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FullNodeTheme from 'react-sortable-tree-theme-full-node-drag';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { action } from 'mobx';

function getTreeData(json, { isRoot = false } = {}) {
  let title = <div>{json.$type}</div>;
  if (json.icon) {
    title = (
      <div>
        <i className={`fa fa-${json.icon}`} />
        {json.viewType}
      </div>
    );
  }
  const treeData = {
    title,
    expanded: json.expanded,
    // selected: json.selected,
    id: json.id,
    isRoot,
    origin: json,
  };
  if (json.children.length) {
    treeData.children = json.children.map(ch => getTreeData(ch));
  }
  if (isRoot) {
    return [treeData];
  }
  return treeData;
}

function rebuildModel(treeModel) {
  const originModel = treeModel.origin;
  if (treeModel.children) {
    originModel.children = treeModel.children.map(ch => rebuildModel(ch));
  }
  return treeModel.origin;
}

@observer
class Tree extends Component {
  handleVisibilityToggle = data => {
    const origin = data.node.origin;
    origin.setExpanded(data.expanded);
  };


  @action
  handleDataChange = data => {
    const root = data[0];
    rebuildModel(root);
  };

  canDrop = item => {
    // root 节点，不需要
    if (item.isRoot) {
      return false;
    }

    // 变换过，如果检测 nextParent 是否可以接收移动的 widget
    // 既: move的节点的类型是否在 nextParent.origin 的AllowedChildrenTypes 里
    const nextParent = item.nextParent;
    if (nextParent && nextParent.origin) {
      const AllowedChildrenTypes = nextParent.origin.AllowedChildrenTypes;
      const type = item.node.origin.$type;
      if (!AllowedChildrenTypes || !_.includes(AllowedChildrenTypes, type)) {
        return false;
      }
    } else {
      return false;
    }

    return true;
  };

  render() {
    const model = this.props.model;
    const treeData = getTreeData(model, { isRoot: true });
    console.log(treeData);
    return (
      <SortableTree
        canDrop={this.canDrop}
        onVisibilityToggle={this.handleVisibilityToggle}
        treeData={treeData}
        onChange={this.handleDataChange}
        isVirtualized={false}
        onMoveNode={this.handleMoveNode}
        theme={FullNodeTheme}
        generateNodeProps={rowInfo => {
          const origin = rowInfo.node.origin;
          const buttons = []; // ReactNode
          return {
            listIndex: 0,
            lowerSiblingCounts: [],
            subtitle() {
              const id = origin.attr.id;
              if (id) {
                return `#${id}`;
              }
              return '';
            },
            buttons,
            className: origin.selected
              ? `selected widget-tree-item`
              : 'widget-tree-item',
            onClick: () => {
              // origin.setExpanded(true);
              this.props.onSelect(origin, false);
            },
          };
        }}
      />
    );
  }
}

export default Tree;
