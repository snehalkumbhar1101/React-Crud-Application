import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import PWDRequisite from './PWDRequisite';

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

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [country, setCountry] = useState("");
  const [pwdRequiste, setPWDRquisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnFocus = () => {
    setPWDRquisite(true);
  };

  const handleOnBlur = () => {
    setPWDRquisite(false);
  };

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );
    const checkContactGenderExists = contacts.filter((contact) =>
      contact.gender === gender ? contact : null
    );
    const checkContactPasswordExists = contacts.filter((contact) =>
      contact.password === password ? contact : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );
    const checkContactCommentExists = contacts.filter((contact) =>
      contact.comment === comment ? contact : null
    );
    const checkContactCountryExists = contacts.filter((contact) =>
      contact.country === country ? contact : null
    );

    if (!gender || !email || !password || !name || !phone || !comment || !country) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPasswordExists.length > 0) {
      return toast.error("This password already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }
    


    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      password,
      name,
      gender,
      phone,
      comment,
      country,
    };

    addContact(data);
    toast.success("Contact added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <label> Full Name </label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label> Gender</label>
            <div className="form-group">
              <input type='radio' style={{ margin: '10px' }} name='gender' onChange={() => setGender('Male')} />Male
              <input type='radio' style={{ margin: '10px' }} name='gender' onChange={() => setGender('Female')} />Female
            </div>
            <label> Email-ID </label>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>










            <label> Password </label>
            <div className="app">
            <div className="header">

            </div>
            <div className="card">
              <div className="password">
                <input
                  className="input-field"
                  id="password"
                  type="password"
                  style={{ width: '50%', padding: '5px', height: '35px', margin: '10px' }}
                  value={password}
                  placeholder="Enter Password"
                  onChange={handlePasswordOnChange}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onKeyUp={handleOnKeyUp}
                required/>
              </div>
              {pwdRequiste ? (
                <PWDRequisite
                  capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                  numberFlag={checks.numberCheck ? "valid" : "invalid"}
                  pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                  specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
                />
              ) : null}
            </div>
          </div>






            <label> Phone Number </label>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <label> Comment </label>
            <div className="form-group">
              <input textfield
                className="form-control"
                type="comment"
                placeholder="Comment"
                value={comment}
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
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
