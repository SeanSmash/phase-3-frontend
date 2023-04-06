import React from 'react';

function CategoryAdd({ categories, categoriesToAdd, handleCategoriesToAdd }){
    const categoriesToAddUnique = [...new Set(categoriesToAdd)]

    return(
        <>
        <select onChange={handleCategoriesToAdd}>
            {categories.map(cat =>(
                <option key={cat.id} value={cat.category}>{cat.category}</option>
            ))}
            <option value="Reset">Reset</option>
        </select><br></br>
        {categoriesToAddUnique.map(cat =>(
            <label className="category-add">{cat}</label>
        ))}
        </>
    )
}

export default CategoryAdd;