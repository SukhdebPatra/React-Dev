import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import axios from "axios";

const Products = () => {
  const [userInput, setUserInput] = useState({
    id: "",
    title: "",
    brand: "",
    cat: "",
    price: "",
    rating: "",
  });
  const [users, setUsers] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);
  const [formToggle, setFormToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  const getData = () => {
    axios
      .get(`http://localhost:3000/products`)
      .then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: userInput.id,
      title: userInput.title,
      brand: userInput.brand,
      category: userInput.cat,
      price: userInput.price,
      rating: userInput.rating,
    };

    if (toggleButton == true) {
      // Update the user
      axios
        .put(`http://localhost:3000/products/${userInput.id}`, data)
        .then((res) => {
          console.log(res.data);
          setUsers(
            users.map((user) => (user.id === userInput.id ? res.data : user))
          );
          setToggleButton(false);
          setUserInput({
            id: "",
            title: "",
            brand: "",
            cat: "",
            price: "",
            rating: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add a new user
      axios
        .post("http://localhost:3000/products", data)
        .then((res) => {
          console.log(res.data);
          setUsers((prevUsers) => [...prevUsers, res.data]);
          setToggleButton(false);
          setUserInput({
            id: "",
            title: "",
            brand: "",
            cat: "",
            price: "",
            rating: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        // Correct way to filter the user list after deletion
        // setUsers(users.filter((user) => user.id !== id));
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    // setFormToggle(!formToggle);
    const userToEdit = users.find((user) => user.id === id); // Find the user to edit
    setToggleButton(true);
    if (userToEdit) {
      setUserInput({
        id: userToEdit.id,
        title: userToEdit.title,
        brand: userToEdit.brand,
        cat: userToEdit.category,
        price: userToEdit.price,
        rating: userToEdit.rating,
      });
    }
  };
  const handleToggle = () => {
    setFormToggle(!formToggle);
  };

  // Filter the users based on the search query
  //    const filteredUsers = users.filter((user) => {
  //     return (
  //       user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       user.brand.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   });

  return (
    <>
      <Button
        className="btn-small btn-danger pull-right"
        style={{ marginTop: "10px", marginLeft: "90%" }}
        label="Add User"
        onClick={handleToggle}
      />
      {formToggle === true ? (
        <form action="" onSubmit={handleSubmit}>
          <div className="container mb-4 mr-2 mt-4">
            <div
              style={{
                border: "6px solid",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h3 className="text-center text-primary">User Details</h3>
              <div className="row">
                <div className="col-2">
                  <label htmlFor="" className="form-label">
                    User ID
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="id"
                    id=""
                    onChange={handleChange}
                    value={userInput.id}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id=""
                    onChange={handleChange}
                    value={userInput.title}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <label htmlFor="" className="form-label">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id=""
                    onChange={handleChange}
                    value={userInput.brand}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <label htmlFor="" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={userInput.cat}
                    className="form-control"
                    name="cat"
                    id=""
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="" className="form-label">
                    Price
                  </label>
                  <input
                    onChange={handleChange}
                    value={userInput.price}
                    type="text"
                    name="price"
                    className="form-control"
                    id=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label htmlFor="" className="form-label">
                    Rating
                  </label>
                  <input
                    type="text"
                    name="rating"
                    onChange={handleChange}
                    value={userInput.rating}
                    className="form-control"
                    id=""
                  />
                </div>
                <div className="row">
                  <div className="col-3 mt-3">
                    <Button
                      className="btn btn-primaryOne btn-small"
                      label={toggleButton === true ? "Edit User" : "Add User"}
                    />
                    {/* <button className="btn btn-primary">
                    {toggleButton === true ? "Edit User" : "Add User"}
                  </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
      <div className="container">
        <div className="row">
          <div className="col-4">
            <input
              className="form-control"
              type="search"
              onChange={handleSearchChange}
              name=""
              value={searchQuery}
              id=""
            />
          </div>
        </div>
        <table className="table table-light mt-2 ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Opration</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((ele, id) => (
                <tr key={id}>
                  <td>{ele.id}</td>
                  <td>{ele.title}</td>
                  <td>{ele.brand}</td>
                  <td>{ele.category}</td>
                  <td>{ele.price}</td>
                  <td>{ele.rating}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(ele.id)}
                      className="bi bi-pencil text-primary"
                    ></i>
                    <i
                      style={{ cursor: "pointer" }}
                      className="bi bi-trash2-fill text-danger"
                      onClick={() => handleDelete(ele.id)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
