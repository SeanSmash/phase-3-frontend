import React from 'react';

function CategoryAdd({ categories, categoriesToAdd, handleCategoriesToAdd }){
    const categoriesToAddUnique = [...new Set(categoriesToAdd)]

    return(
        <>
        <select onChange={handleCategoriesToAdd}>
            <option value="category">category</option>
            {categories.map(cat =>(
                <option key={cat.id} value={cat.category}>{cat.category}</option>
            ))}
            <option value="reset">reset</option>
        </select><br></br>
        {categoriesToAddUnique.map(cat =>(
            <label className="category-add">{cat}</label>
        ))}
        </>
    )
}

export default CategoryAdd;