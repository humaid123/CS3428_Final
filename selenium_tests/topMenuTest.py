# check what happens when office, compose and help button clicked
# for specialist => check what happens when deleteAccount clicked.

# Lydia Belachew (A00416825)

from selenium.webdriver import Chrome
import time

# Testing specialist
driver = Chrome("chromedriver.exe")
index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
email = "test2"
password = "t2"

# will open chrome and will go to http://ugdev.cs.smu.ca/~group7/index.html
driver.get(index_url)
# finds the button Specialist selection and clicks it
driver.find_element_by_id("specialistSelection").click()
time.sleep(1)

# enter email and password
driver.find_element_by_id("email").send_keys(email)
driver.find_element_by_id("password").send_keys(password)

# click Basic level and then click signin button

# driver.find_element_by_id("").click()
driver.find_element_by_id("signInButton").click()
time.sleep(4)  # sending to the sever

# this is for the successfully connected
driver.switch_to.alert.accept()
time.sleep(6)

# this is for the unread emails
driver.switch_to.alert.accept()
time.sleep(6)

# testing Office button from top menu
# opens sidebar
driver.find_element_by_id("officeButton").click()
time.sleep(10)
# closes sidebar
driver.find_element_by_id("closeButton").click()

# Testing Compose button from top menu
driver.find_element_by_id("composeButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Specialist/adminCompose.html", "Error! Clicking the Compose button did not redirect to the Compose screen."
time.sleep(4)
# Click cancel button to go back to main page
driver.find_element_by_id("cancelButton").click()
# this is asks if you are sure you want to cancel composing email
driver.switch_to.alert.accept()
time.sleep(6)

# this is for the unread emails alert that appears when you go back to the main page
driver.switch_to.alert.accept()
time.sleep(4)

# Testing Help desk button from top menu
driver.find_element_by_id("HelpDeskButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Helps/HelpMain.html", "Error! Clicking on the Help Desk button did not redirect you to Help Desk window."
time.sleep(4)

# Testing deleting accounts button from top menu
driver.find_element_by_id("DeleteAccountButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Specialist/deleteAccounts.html", "Error! Clicking on the Delete Accounts button did not redirect you to Delete Account window."
time.sleep(4)
# Click back button to go to main page
driver.find_element_by_id("backButton").click()
# this is for the unread emails alert that appears when you go back to the main page
driver.switch_to.alert.accept()
time.sleep(4)
driver.close()
