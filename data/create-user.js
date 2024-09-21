db.createUser({
    user: "cotojs_user",
    pwd: "password",
    roles: [{ role: "readWrite", db: "db-cotojs" }]
  });