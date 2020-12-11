# basic system's control group

# check what happens when inbox sent items, compose and help desk clicked

from selenium.webdriver import Chrome
import time

driver = Chrome("chromedriver.exe")
index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
email = "test1"
password = "hi"

driver.get(index_url) #will open chrome and will go to http://ugdev.cs.smu.ca/~group7/index.html
driver.find_element_by_id("studentSelection").click() #finds the button Student selection and clicks it
time.sleep(1)

driver.find_element_by_id("email").send_keys(email)
driver.find_element_by_id("password").send_keys(password)

driver.find_element_by_id("Basic").click()
driver.find_element_by_id("signInButton").click()
time.sleep(4) #sending to the sever

#this is for the successfully connected
driver.switch_to.alert.accept() 
time.sleep(4)
#this is for the unread emails
driver.switch_to.alert.accept() 
time.sleep(4)

#testing Sent Items button
driver.find_element_by_id("sentItemButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_Basic/sentItems.html","Clicking Sent items did not redirect to Sent item screen."

#testing the compose button on Sent items screen
driver.find_element_by_id("composeButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/ComposeScreens/studentCompose.html", "Clicking the Compose button did not redirect to the compose screen."

driver.close() 





