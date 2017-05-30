function view(dispatch, state, root, components) {
  emptyDom(root);
  return [...components].forEach(component => root.appendChild(component));
}
