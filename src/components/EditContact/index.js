import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const countries = [
  { name: 'India' },
  { name: 'Australia' },
  { name: 'Brazil' },
  { name: 'Canada' },
  { name: 'Duabi' },
  { name: 'England' },
  { name: 'Finland' },
  { name: 'Greek' },
]

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setGender(currentContact.gender);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
    setComment(currentContact.comment);
    setCountry(currentContact.country);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactGenderExists = contacts.filter((contact) =>
      contact.gender === gender && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    const checkContactCommentExists = contacts.filter((contact) =>
      contact.comment === comment && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactCountryExists = contacts.filter((contact) =>
    contact.country === country && contact.id !== currentContact.id
      ? contact
      : null
  );

    if (!gender || !email || !name || !phone || !comment || !country) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentContact.id,
      email,
      gender,
      name,
      phone,
      comment,
      country,
    };

    updateContact(data);
    toast.success("Contact updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <label> Comment </label>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label> Gender </label>
              <div className="form-group">
                <input type='radio' style={{ margin: '10px' }} name='gender' onChange={() => setGender('Male')} />Male
                <input type='radio' style={{ margin: '10px' }} name='gender' onChange={() => setGender('Female')} />Female
              </div>

              <label> Email_ID </label>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label> Phone Number </label>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <label> Comment </label>
              <div className="form-group">
                <input textfield
                  className="form-control"
                  value={comment}
                  placeholder={"Comment"}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <label> Country </label>
              <div className="form-group">
              <select onChange={(e) => setCountry(e.target.value)}>
                                <option value='none'>select</option>
                                {countries.map(item => (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                ))}
                            </select>

              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
