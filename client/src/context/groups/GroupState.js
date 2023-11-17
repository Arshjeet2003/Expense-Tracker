import { useState } from "react";
import GroupContext from './groupContext.js';

const GroupState = (props)=>{
    const host = "http://localhost:5004"

    const [groups,setGroups] = useState([]);
    const [members,setMembers] = useState([]);

    const getGroups = async (search) => {
        try {
          const response = await fetch(`${host}/api/groups/getgroups?search=${search}`, {
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          });
          const data = await response.json();
          setGroups(data);
        } catch (error) {
          // Handle network or other errors
          console.error('An error occurred:', error);
        }
      };

      const getGroup = async (id) => {
        try {
          const response = await fetch(`${host}/api/groups/getgroups/${id}`, {
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          });
          const data = await response.json();
          return data;
          // setGroups(data);
        } catch (error) {
          // Handle network or other errors
          console.error('An error occurred:', error);
        }
      };

      const getGroupTransactions = async (id) => {
        try {
          const response = await fetch(`${host}/api/groups/getTransaction/${id}`, {
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          });
          const data = await response.json();
          return data;
          // setGroups(data);
        } catch (error) {
          // Handle network or other errors
          console.error('An error occurred:', error);
        }
      };

    const addGroup = async (name,description)=>{
        const response = await fetch(`${host}/api/groups/addgroup`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,description})
        });

        const group = await response.json();
        setGroups(groups.concat(group));
    }

    const AddGroupTransaction = async (groupMember, price, grpId, currencyTypeGroup)=>{
      const response = await fetch(`${host}/api/groups/addTransaction/${grpId}`,{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({groupMember, price, currencyTypeGroup})
      });

      const group = await response.text();
  }

    const deleteGroup = async (id)=>{
        const response = await fetch(`${host}/api/groups/deletegroup/${id}`,{
            method: 'DELETE',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.json();
        const newGroups = groups.filter((group)=>{return group._id!==id})
        setGroups(newGroups);
    }

    const editGroup = async (id,name,description)=>{
        const response = await fetch(`${host}/api/groups/updategroup/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,description})
        });
        const json =  await response.json();
        let newGroups = await JSON.parse(JSON.stringify(groups))
        for(let index=0; index<newGroups.length; index++){
            const element = newGroups[index];
            if(element._id === id){
                newGroups[index].name = name;
                newGroups[index].description = description;
                break;
            }
        }
        setGroups(newGroups);
    }

    const addGroupMember = async (id,username)=>{
      const response = await fetch(`${host}/api/groups/add/${id}/${username}`,{
          method: 'POST',
          headers:{
              'auth-token': localStorage.getItem('token')
          },
      });

      const member = await response.json();
      setMembers(members.concat(member));
  }

  const deleteGroupMember = async (id,username)=>{
    const response = await fetch(`${host}/api/groups/delete/${id}/${username}`,{
        method: 'DELETE',
        headers:{
            'auth-token': localStorage.getItem('token')
        },
    });

    const member = await response.text();
    const newMembers = members.filter((member)=>{return member!==username})
    setMembers(newMembers);
  }

    return (
        <GroupContext.Provider value={{members,groups,addGroup,deleteGroup,editGroup,getGroups,
        getGroup,addGroupMember,deleteGroupMember,getGroupTransactions,AddGroupTransaction}}>
            {props.children}
        </GroupContext.Provider>
    );
}
export default GroupState