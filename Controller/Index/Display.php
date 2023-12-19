<?php

namespace AddressWise\AddressWise\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use AddressWise\AddressWise\Helper\Data;

/**
 * Class Display
 */

/**
 * Display controller for handling XYZ functionality.
 */

class Display extends Action
{
    /**
     * @var Data
     */
    protected $helperData;

    /**
     * @var PageFactory
     */
    protected $resultPageFactory;

    /**
     * Display constructor.
     *
     * @param Context $context
     * @param Data $helperData
     * @param PageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
        Data $helperData,
        PageFactory $resultPageFactory
    ) {
        $this->helperData = $helperData;
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }

    /**
     * Execute the controller action.
     */
    public function execute()
    {
        $accessToken = $this->helperData->getClientToken();

    }
}
