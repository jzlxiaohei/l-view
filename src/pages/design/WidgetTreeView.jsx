import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FullNodeTheme from 'react-sortable-tree-theme-full-node-drag';
import { observer } from 'mobx-react';
import _ from 'lodash';

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
  if(isRoot) {
    return [treeData];
  }
  return treeData;
}

@observer
class Tree extends Component {

  handleVisibilityToggle = data => {
    const origin = data.node.origin;
    origin.setExpanded(data.expanded);
  };

  render() {
    const model = this.props.model;
    const treeData = getTreeData(model, { isRoot: true });
    return (
      <SortableTree
        onVisibilityToggle={this.handleVisibilityToggle}
        treeData={treeData}
        onChange={_.noop}
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
            }
          };
        }}
      />
    );
  }
}

export default Tree;
