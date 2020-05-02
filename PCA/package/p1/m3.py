import logging
def f5():
    logger.info('entering p1.m3.f5')
    logger.info('exiting p1.m3.f5')
logger=logging.getLogger(__name__)
filehandler=logging.FileHandler(filename='p1.log')
filehandler.setLevel(logging.INFO)
streamhandler=logging.StreamHandler()
streamhandler.setLevel(logging.WARNING)
logger.addHandler(filehandler)
logger.addHandler(streamhandler)
logger.setLevel(logging.INFO)
logger.propagate=False