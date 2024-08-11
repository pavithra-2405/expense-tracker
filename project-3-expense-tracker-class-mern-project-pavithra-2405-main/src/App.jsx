import React, { useState ,useEffect } from 'react';
import './index.css'

function App(){
  const [expenseList,setExpenseList] = useState([]);
  const[newExpense,setNewExpense]=useState({description:"",amount:0})
  const handlechange=(e)=>{
    setNewExpense({...newExpense,[e.target.name]:e.target.value})
  }

    async function fetchExpenses()
    {
      let response = await fetch("http://localhost:3000/api/expenses");
      let expenses = await response.json();
     
      setExpenseList(expenses);
    }

    const handleSubmit=async(e)=>{
      const response=await fetch("http://localhost:3000/api/expenses",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(newExpense)
      });
      if(!response.ok){
        throw new error;
      }
      else{
        console.log("Value sent successfully");
      }fetchExpenses();
    }
    useEffect(()=>{
          fetchExpenses();
    },[])

    const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete expense');
        }
  
        
        await fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error.message);
      }
    };
  
    return(
      <>
        <div className='expense-item-container'>
          {
            expenseList.map((expenses,index)=>{
              const a=(expenses.amount>0)?"positive":"negative";
              return(
                <div key={index} className={'expense-item '+a}>
                    <div>{expenses.description}</div>
                    <div>{expenses.amount}</div>
                    <button onClick={() => handleDelete(expenses._id)}>Delete</button>
                </div>
              )
             })
          }
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name='description' onChange={handlechange} />
          <input type="number" name='amount' onChange={handlechange} />
          <button type='submit'>Add Expense</button>
          
        </form>
      </>
    )
}
export default App;