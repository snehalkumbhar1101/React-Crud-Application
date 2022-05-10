const initialState = [
  { id: 0, name: "Raman Sharma",gender:"male", email: "email@email.com", phone: 1234567890,comment: "hello class" ,country: "Dubai" },
  { id: 1, name: "Test Name",gender:"male", email: "test@test.com", phone: 4567891230, comment: "hellodc jqa" ,country: "India"},
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null,gender: null,  email: null, phone: null, comment: null, country: null }];
      return state;
    default:
      return state;
  }
};
