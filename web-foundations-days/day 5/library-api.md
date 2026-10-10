# Library Books REST API

## List all books

- Method: GET
- Path: `/books`
- Description: Returns all books.
- Success: **200 OK**

---

## Get one book

- Method: GET
- Path: `/books/{id}`
- Description: Returns one book by ID.
- Success: **200 OK**

---

## Create a book

- Method: POST
- Path: `/books`
- Description: Creates a new book.

Example request body:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

Success: **201 Created**

---

## Update a book

- Method: PUT
- Path: `/books/{id}`
- Description: Updates an existing book.

Example request body:

```json
{
  "title": "Clean Code (Updated)",
  "author": "Robert C. Martin",
  "year": 2008
}
```

Success: **200 OK**

---

## Delete a book

- Method: DELETE
- Path: `/books/{id}`
- Description: Deletes a book.
- Success: **204 No Content**

---

## List books by author

- Method: GET
- Path: `/books?author=Robert`
- Description: Returns books written by a given author.
- Success: **200 OK**

---

# Error Codes

## 400 Bad Request

Example:
The request body is missing the title field when creating a book.

---

## 404 Not Found

Example:
A request is made for `/books/999` but no book with ID 999 exists.