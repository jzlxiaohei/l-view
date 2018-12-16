import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FullNodeTheme from 'react-sortable-tree-theme-full-node-drag';
import { observer } from 'mobx-react';

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
    selected: json.selected,
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
    data.node.origin.setExpanded(data.expanded);
  };

  render() {
    const model = this.props.model;
    const treeData = getTreeData(model, { isRoot: true });
    return (
      <SortableTree
        onVisibilityToggle={this.handleVisibilityToggle}
        treeData={treeData}
        onChange={treeData => console.log({ treeData })}
        theme={FullNodeTheme}
      />
    );
  }
}

export default Tree;
