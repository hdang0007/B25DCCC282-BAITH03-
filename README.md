# ShopMini

ShopMini là ứng dụng cửa hàng mini xây dựng bằng React, TypeScript và Vite. Ứng dụng dùng Fake Store API để hiển thị sản phẩm; giao diện được thiết kế bằng tiếng Việt và hỗ trợ màn hình điện thoại, tablet, desktop cùng giao diện sáng/tối.

## Chạy ứng dụng

Yêu cầu Node.js 18 trở lên.

```bash
npm install
npm run dev
```

Tạo bản dựng production bằng `npm run build`, hoặc xem bản dựng bằng `npm run preview`.

## Tài khoản demo

Tên đăng nhập tùy chọn; mật khẩu demo là `123456`. Đây là đăng nhập giả lập phía trình duyệt, không phải hệ thống xác thực dùng cho production.

## Phân chia state

- **useState:** ô tìm kiếm, dữ liệu đang nhập ở form đăng nhập, thông báo lỗi đăng nhập và trạng thái đặt hàng thành công. Đây là trạng thái giao diện tạm thời, chỉ cần thiết trong trang đang hiển thị.
- **Context API:** `ThemeContext` quản lý giao diện sáng/tối; `AuthContext` quản lý người dùng và đăng nhập/đăng xuất. Những giá trị này được dùng ở nhiều trang nên được chia sẻ toàn ứng dụng. Giao diện và người dùng được lưu trong `localStorage` để còn sau khi tải lại trang.
- **Redux Toolkit:** `productsSlice` quản lý danh sách sản phẩm và trạng thái tải API; `cartSlice` quản lý giỏ hàng, số lượng và tổng tiền. Đây là dữ liệu dùng chung giữa nhiều trang và cần được cập nhật nhất quán.
- **URL React Router:** trang hiện tại và mã sản phẩm thuộc URL (`/`, `/products/:id`, `/cart`, `/login`, `/checkout`); đường dẫn checkout được bảo vệ và quay lại sau khi đăng nhập.

## Cấu trúc chính

```text
src/
├── app/                 # Redux store và typed hooks
├── components/          # Header, product card, protected route
├── contexts/            # ThemeContext và AuthContext
├── features/            # productsSlice và cartSlice
├── layouts/             # MainLayout
├── pages/               # Trang chủ, chi tiết, giỏ, đăng nhập, thanh toán, 404
├── types/               # Product, CartItem, User
├── App.tsx
├── main.tsx
└── styles.css
```

## Đưa bài lên GitHub

Tạo repository với tên `<mã sinh viên> - BaiTH03`, sau đó chạy các lệnh sau trong thư mục dự án (thay URL bằng repository của bạn):

```bash
git init
git add .
git commit -m "Build ShopMini practice 03"
git branch -M main
git remote add origin <URL-repository>
git push -u origin main
```

`node_modules/` và `dist/` đã được loại khỏi Git bằng `.gitignore`.
