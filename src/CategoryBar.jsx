function CategoryBar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-buttons">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;

