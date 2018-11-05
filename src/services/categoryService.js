import http from './httpService';

export function getCategories() {
  return http.get("/categories");
};

export function getCategory(category_id) {
  return http.get(`/categories/${category_id}`);
};

export function saveCategory(category_object) {
  return http.post("/categories", category_object);
};

export function deleteCategory(category_id) {
  return http.delete(`/categories/${category_id}`);
};

export function updateCategory(category_id, category_object) {
  return http.put(`/categories/${category_id}`, category_object);
};
