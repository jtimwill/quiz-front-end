import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../services/categoryService.js';
// import { getCurrentUser } from '../../services/authService';
import Spinner from '../reusable/spinner';
import { compareNames } from '../../utilities/sortUtility.js';

class CategoryIndex extends Component {
  state = {
    categories: [],
    current_category: {},
    api_response: false
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    categories.sort(compareNames);
    this.setState({ categories, api_response: true });
  }

  async handleDelete(selected_category) {
    // if (!getCurrentUser().admin) {
    //   alert("Access Denied, Admin Only");
    //   return;
    // }

    const old_categories = this.state.categories;
    const new_categories = old_categories.filter(category => {
      return category.id !== selected_category.id;
    });
    this.setState({ categories: new_categories });

    try {
      await deleteCategory(selected_category.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This category has already been deleted.");
      }
      this.setState({ categories: old_categories });
    }
  }

  handleRowSelect(category) {
    const categories = [ ...this.state.categories ];
    const prev_category = this.state.current_category;
    const current_category = category;

    if (Object.keys(prev_category).length) {
      prev_category.active = "";
    }
    current_category.active = "table-active";
    this.setState({ categories, current_category });
  }

  handleCategorySelect = (category_name) => {
    const categories = this.state.categories;
    const category = categories.find(category => category.name === category_name);
    this.handleRowSelect(category);
  };

  render() {
    return (
      <Spinner ready={this.state.api_response}>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h4>Categories</h4>
            </div>
            <div className="col-sm">
              <Link to="/categories/new" className="btn btn-primary">New Category</Link>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.categories.map(category => (
                    <tr key={category.id} className={category.active}>
                      <td onClick={() => this.handleRowSelect(category)}>
                        {category.name}
                      </td>
                      <td>
                        <Link
                          to={category.id + "/edit"}
                          className="btn btn-info btn-sm">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(category)}
                          className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Spinner>
    );
  }
}

export default CategoryIndex;
