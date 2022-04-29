import React from 'react'

// Tách dữ liệu 
const data = ['SẢN PHẨM 1', 'SẢN PHẨM 2', 'SẢN PHẨM 3']

const Contact = () => {
  return <div>
    {/* sử dụng map để tạo ra n cái div tương ứng (n ở đây chính là độ dài của array trên) */}
    {data.map((item, index) => <div key={index}>
      {item}
    </div>)}
  </div>
}

export default Contact

