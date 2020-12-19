import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { DevTool } from "@hookform/devtools";
import { db } from "../../Firebase/Firebase.js";
import { alertError, alertSuccess } from "../../Alerts/Alert.js";
import TableRowWelder from './TableRowWelder.js'
import classes from "./TableWelder.module.css";

export default function TableWelder() {
   const namesTableHeader = [
      '№ Свай',
      'Оголовок.Марка',
      'Труба.Свая,мм',
      'Толщина косынки,мм',
      'Фамилия',
      'Удалить строку',
   ]
   const id = uuidv4();
   const [rowsData, setRowsData] = useState([]);
   const { register, errors, handleSubmit } = useForm();
   const [position, setPosition] = useState("");
   const [isLoaded, setIsLoaded] = useState(false)
   const [isPostToServer, setIsPostToServer] = useState(false);
   const getPosition = ({ target: { value } }) => setPosition(value);

   // --------------------------------------------ПОДТЯГИВАНИЕ ДАННЫХ С СЕРВЕРА
   useEffect(() => {
      if (!rowsData.length) {
         db.ref("welder")
            .once("value")
            .then(snapshot => {
               snapshot.forEach(childSnapshot => {
                  setRowsData(childSnapshot.val());
                  setPosition(childSnapshot.key);
                  setIsPostToServer(true)
                  setIsLoaded(true)
               });
            }).catch(error => alertError(error.message))
      }
   }, []);
   // --------------------------------------------ДОБАВЛЕНИЕ СТРОКИ
   const createRow = () => setRowsData([...rowsData, { id }]);

   // -----------------------------------------------УДАЛЕНИЕ СТРОЧКИ
   const removeRow = id => {
      const newRow = rowsData.filter(row => {
         return row.id !== id;
      });
      setRowsData(newRow);
   };

   // --------------------------------------------ОБНОВЛЕНИЕ ДАННЫХ В ТАБЛИЦЕ
   const updateValueInput = ({ target }, id) => {
      const elementIndex = rowsData.findIndex(element => element.id === id);
      let newArray = [...rowsData];
      newArray[elementIndex] = { ...newArray[elementIndex], [target.name]: target.value };
      setRowsData(newArray);
      //!------------------------------------ ОДИНКЛИк
   };

   // --------------------------------------------ОТПРАВКА НА СЕРВЕР ДАННЫХ С ТАБЛИЦЫ
   const onSubmit = data => {
      if (isPostToServer) {

         db.ref("welder")
            .orderByKey()
            .endAt('welder')
            .on("child_added", function (snapshot) {
               let namePosition = snapshot.key;
               db.ref(`welder/${namePosition}`).set(rowsData);
               setPosition(data.namePosition);
            });

         alertSuccess("Вы успешно обновили данные");

      } else {

         db.ref()
            .child("welder")
            .child(position)
            .set(rowsData);

         setIsPostToServer(true);
         alertSuccess("Вы успешно создали базу");

         console.log("Отправить это на сервер-", rowsData);
      }
   };


   return (
      <div>
         <div className='text-center'>
            <h2 className='p-2'>ДКС-1 заполярного НГКМ</h2>
         </div>

         <div className='container p-5 border border-info rounded'>
            <div className='row'>
               <div className='input-group mb-3'>
                  <input
                     onChange={getPosition}
                     ref={register({ required: true })}
                     name='namePosition'
                     type='text'
                     className='form-control'
                     placeholder='Назначить позицию'
                     value={position}
                  />
                  <div className='input-group-prepend'>
                     <button type='button' className=' text-left btn btn-info'>
                        Позиция
							</button>
                  </div>

               </div>
               {errors.namePosition && <p className={classes.error}>Введите позицию</p>}

               <table className='table table-bordered  rounded table-responsive '>
                  <thead>
                     <tr>
                        {namesTableHeader.map((nameTableHeader, i) => {
                           return (
                              <th className='align-top' key={i}>
                                 <p className={`m-0 m-auto ${classes.verticalText}`}>{nameTableHeader}</p>
                              </th>
                           )
                        })}
                     </tr>
                  </thead>

                  <tbody>
                     {rowsData.map(({ ...rowDataAllProps }) => {
                        return (
                           <tr className={classes.inputIcon} key={uuidv4()}>
                              <TableRowWelder
                                 {...rowDataAllProps}
                                 updateValueInput={updateValueInput}
                                 removeRow={removeRow} />
                           </tr>
                        );
                     })}
                  </tbody>

               </table>
            </div>
            <div className='row justify-content-between'>
               <div className='col-auto mr-auto '>
                  <button type='button' className=' text-left btn btn-primary' onClick={createRow}>
                     Добавить строку
						</button>
               </div>
               <div className='col-auto '>
                  <button type='button' className=' text-left btn btn-info' onClick={handleSubmit(onSubmit)}>
                     Создать таблицу
						</button>
               </div>
            </div>
         </div>
         {/* <DevTool control={control} /> set up the dev tool */}
      </div>
   )
}



// export default TableWelder
// import React, { useState } from 'react'
// import classes from './TableWelder.module.css'
// import { v4 as uuidv4 } from "uuid";
// import TableRowWelder from './TableRowWelder';

// const TableWelder = () => {
//    const id = uuidv4();
//    const [rowsData, setRowsData] = useState([]);
//    const createRow = () => setRowsData([...rowsData, { id }]);

//    return (
//       <div>
//          <div className='text-center'>
//             <h2 className='p-2'>ДКС-1 заполярного НГКМ</h2>
//          </div>

//          <div className='container p-5 border border-info rounded'>
//             <div className=' row '>
//                <div className='input-group mb-3'>
//                   <input
//                      name='namePosition'
//                      type='text'
//                      className='form-control'
//                      placeholder='Назначить позицию'
//                   />
//                   <div className='input-group-prepend'>
//                      <button type='button' className=' text-left btn btn-info'>
//                         Позиция
//                   </button>
//                   </div>

//                </div>
//                <table className='table table-bordered  rounded table-responsive '>
//                   <thead>
//                      <tr>
//                         <th className='align-top'>
//                            <p className={`m-0 m-auto ${classes.verticalText}`}>№ Свай</p>
//                         </th>
//                         <th className='align-top'>
//                            <p className={`m-0 m-auto ${classes.verticalText}`}>Оголовок.Марка</p>
//                         </th>
//                         <th className='align-top '>
//                            <p className={`m-0 m-auto ${classes.verticalText}`}>Труба.Свая,мм</p>
//                         </th>
//                         <th className='align-top '>
//                            <p className={`m-0 m-auto ${classes.verticalText}`}>Толщина косынки,мм</p>
//                         </th>
//                      </tr>
//                   </thead>

//                   <tbody>
//                      {rowsData.map(({ ...allProps }) => {
//                         return (
//                            <tr key={uuidv4()} >
//                               <TableRowWelder {...allProps} />
//                            </tr>
//                         )
//                      })}

//                   </tbody>
//                </table>
//             </div>
//             <div className='row justify-content-between'>
//                <div className='col-auto mr-auto '>
//                   <button
//                      type='button'
//                      className=' text-left btn btn-primary'
//                      onClick={createRow}
//                   >Добавить строку
//                   </button>
//                </div>
//                <div className='col-auto '>
//                   <button
//                      type='button'
//                      className=' text-left btn btn-info'
//                   >
//                      Создать таблицу
//                   </button>
//                </div>
//             </div>
//          </div>
//       </div>

//    )
// }

// export default TableWelder
