# basic system's control group

# check what happens when inbox sent items, compose and help desk clicked
# Lydia Belachew (A00416825)

from selenium.webdriver import Chrome
import time

driver = Chrome("chromedriver.exe")
index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
email = "test1"
password = "hi"

# will open chrome and will go to http://ugdev.cs.smu.ca/~group7/index.html
driver.get(index_url)
# finds the button Student selection and clicks it
driver.find_element_by_id("studentSelection").click()
time.sleep(1)

# enter email and password
driver.find_element_by_id("email").send_keys(email)
driver.find_element_by_id("password").send_keys(password)

# click Basic level and then click signin button
driver.find_element_by_id("Basic").click()
driver.find_element_by_id("signInButton").click()
time.sleep(4)  # sending to the sever

# this is for the successfully connected
driver.switch_to.alert.accept()
time.sleep(4)

# this is for the unread emails
driver.switch_to.alert.accept()
time.sleep(4)

# testing Sent Items button
driver.find_element_by_id("sentItemButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_Basic/sentItems.html", "Error! Clicking Sent Items did not redirect to Sent Items screen."
time.sleep(4)

# testing the compose button on Sent Items screen
driver.find_element_by_id("composeButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/ComposeScreens/studentCompose.html", "Error! Clicking the Compose button did not redirect to the Compose screen."
time.sleep(4)

# testing after clicking the cancel button the compose screen
driver.find_element_by_id("cancelButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_Basic/sentItems.html", "Error! Clicking on the Cancel button did not redirect you to the Sent Items screen."
time.sleep(4)

# testing the help desk button the Sent Items screen
driver.find_element_by_id("helpButton").click()
assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Helps/HelpMain.html", "Error! Clicking on the Help Desk button did not redirect you to Help Desk window."
time.sleep(4)

driver.close()
