import { sortItemsByName } from "./functions/reorderFunctions";

const initialState = {
  items: [],
  selected: [],
  costs: [],
  activeItem: {
    list: "items",
    index: 0
  },
  openAdd: false,
  openEdit: false,
  openDelete: false,
  showItems: false
};

const reducer = (state = initialState, action) => {
  const { list, index, newItem, selected, cost, costs } = action;
  switch (action.type) {
    case "TOGGLE_SHOW_ITEMS":
      return { ...state, showItems: !state.showItems };
    case "TOGGLE_SHOW_ADD_DIALOG":
      return { ...state, openAdd: !state.openAdd };
    case "TOGGLE_SHOW_DELETE_DIALOG":
      return {
        ...state,
        openDelete: !state.openDelete,
        activeItem: { list, index }
      };
    case "TOGGLE_SHOW_EDIT_DIALOG":
      return {
        ...state,
        openEdit: !state.openEdit,
        activeItem: { list, index }
      };
    case "ADD_ITEM":
      let items = [...state.items, newItem];
      sortItemsByName(items);
      return { ...state, items };
    case "DELETE_ITEM":
      items = [...state.items].filter((item, itemIndex) => itemIndex !== index);
      return {
        ...state,
        items
      };
    case "EDIT_ITEM":
      const newList = [...state[list]].map((item, itemIndex) => {
        if (itemIndex === index) {
          item.name = newItem.name;
          item.info = newItem.info;
          return item;
        } else return item;
      });
      return { ...state, [list]: newList };
    case "GET_ITEMS":
      return {
        ...state,
        items: action.items
      };
    case "GET_SELECTED":
      return { ...state, selected };
    case "GET_COSTS":
      return { ...state, costs };
    case "ADD_COST":
      const newCosts = [...state.costs];
      newCosts.push(cost);
      return { ...state, costs: newCosts };
    default:
      return state;
  }
};

export default reducer;
