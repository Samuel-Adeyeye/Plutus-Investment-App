import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const UpdateCompanyProfile = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const dispatch = useDispatch() as unknown as any;
    const [fileData, setFileData] = useState({}) 
    const [file, setFile] = useState('') 
   

    const [formData, setFormData] = useState<LoginData>({
        firstName:"",
        lastName:"",
        address:"",
        email:"",
        city:"",
        state:"",
        zipCode:"",
        country:""
    });
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "file") {
    
          setFileData({
            image: e.target.files[0]
          })
    
          setFile(URL.createObjectURL(e.target.files[0]))
          console.log('file', fileData)
        } else {
          console.log(formData)
          setFormData({
            ...formData,
            [name]: value,
          });
        }
    };
    
    const updateImage = (e: any) => {
        e.preventDefault()
        dispatch(updateLogo(fileData))
      }

      const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          dispatch(accountSettings(formData))
        } catch (error) {
          console.error(error); // Handle error
        }
      };
    
    const users = useSelector((state: any) => state.user.user)
    

    
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        setSelectedFile(file);
  
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setPreviewImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };


    return (
        <>
            
            <div className="space-y-4 w-8/12">
              {/* Personal Info Fields */}
              <div className="flex items-center space-x-2">
                {!file ? <label htmlFor="fileInput" className="w-24 ml-2 mb-0 h-24 flex items-center justify-center rounded-full bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 12.293a1 1 0 011.414 0L10 17.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v9a1 1 0 11-2 0V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label> :
                  <img src={file} alt="hsdjh" className='h-[100px] w-[100px] rounded-[50%] object-cover object-top' />}
                {file ? <button className='w-fit bg-black text-white py-2 rounded-md' onClick={updateImage}>Upload Image</button> : null}
                <input type="file" name="file" id="fileInput" className="hidden" onChange={handleInputChange} />
            </div>

              <div className="">
                <label className="flex flex-col">
                Company Name                  <input onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Company Name"
                    name="companyName"
                  />
                </label>

                {/* Add other input fields here */}
              </div>

              <label className="flex flex-col">
                Email
                <input onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="mail@email.com"
                  name="email"
                />
              </label>

              <label className="flex flex-col">
                Phone Number
                <input onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="+000-12345678"
                  name="phoneNumber"
                />
              </label>

              <label className="flex flex-col">
                Street Address
                <input onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="2 MainLand, Lagos"
                  name="address"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  ZIP
                  <input onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="0000"
                    name="zipCode"
                  />
                </label>

                <label className="flex flex-col">
                  City
                  <input onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Lagos"
                    name="city"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  State
                  <input onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Abuja"
                    name="state"
                  />
                </label>

                <label className="flex flex-col">
                  Country
                  <input onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Nigeria"
                    name="country"
                  />
                </label>
              </div>

              
                <button
                  className="w-full bg-black text-white py-2 rounded-md"
                type="submit" onClick={handleFormSubmit}>
                  Update
                </button>
            </div>  
        </>
    )

};

export default UpdateCompanyProfile;